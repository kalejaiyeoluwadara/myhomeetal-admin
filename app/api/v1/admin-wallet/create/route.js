import axios from "axios";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import AdminWallet from "@/models/AdminWallet";

export const runtime = "nodejs";

function valueOrEmpty(value) {
  return value ? value.toString() : "";
}

function fallbackAccountNo(adminId) {
  return `MH-${adminId.toString().slice(-8).toUpperCase()}`;
}

export async function POST(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  try {
    await connectToDatabase();
    const existingWallet = await AdminWallet.findOne({ admin: auth.admin._id });
    if (existingWallet) {
      return NextResponse.json(
        { message: "Admin wallet already exists", adminWallet: existingWallet },
        { status: 200 }
      );
    }

    const body = await request.json();
    let accountNo = "";

    if (process.env.POOLER_APIKEY && process.env.CREATE_WALLET_API) {
      try {
        const payload = {
          display_name: valueOrEmpty(body.display_name),
          bvn: valueOrEmpty(body.bvn),
          firstname: valueOrEmpty(body.firstname),
          lastname: valueOrEmpty(body.lastname),
          currency: valueOrEmpty(body.currency),
          email: valueOrEmpty(body.email || auth.admin.email),
          gender: valueOrEmpty(body.gender),
          date_of_birth: valueOrEmpty(body.date_of_birth),
          mobile_number: valueOrEmpty(body.mobile_number),
        };

        const response = await axios.post(process.env.CREATE_WALLET_API, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.POOLER_APIKEY}`,
          },
        });

        accountNo = valueOrEmpty(response?.data?.data?.account_no);
      } catch (_providerError) {
        accountNo = "";
      }
    }

    if (!accountNo) {
      accountNo = fallbackAccountNo(auth.admin._id);
    }

    const adminWallet = await AdminWallet.create({
      admin: auth.admin._id,
      account_no: accountNo,
      transactions: [],
    });

    return NextResponse.json({
      message: "Wallet Created Successfully",
      newAdminWalletData: adminWallet,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

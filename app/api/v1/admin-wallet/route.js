import axios from "axios";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import "@/models/User";
import Payment from "@/models/Payment";
import AdminWallet from "@/models/AdminWallet";

export const runtime = "nodejs";

const POOLER_WALLET_API_BASE =
  process.env.POOLER_WALLET_API_BASE || "https://api.poolerapp.com/api/v1/wallet/";

export async function GET(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    await connectToDatabase();

    const adminWallet = await AdminWallet.findOne({ admin: auth.admin._id });
    if (!adminWallet) {
      return NextResponse.json({ error: "Admin Wallet Not found" }, { status: 404 });
    }

    let adminWalletDeets = {
      account_no: adminWallet.account_no,
      available_balance: 0,
      ledger_balance: 0,
    };

    // If Pooler credentials are present, hydrate wallet details from provider.
    if (process.env.POOLER_APIKEY && adminWallet.account_no) {
      try {
        const walletResponse = await axios.get(
          `${POOLER_WALLET_API_BASE}${adminWallet.account_no}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.POOLER_APIKEY}`,
            },
          }
        );

        if (walletResponse?.data?.data) {
          adminWalletDeets = walletResponse.data.data;
        }
      } catch (_providerError) {
        // Keep the local fallback payload so dashboard still works.
      }
    }

    const userPayments = await Payment.find({ status: "Success" })
      .populate("userId", "firstname lastname")
      .sort({ date: -1 })
      .limit(50);

    return NextResponse.json({ adminWalletDeets, userPayments });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch admin wallet details" },
      { status: 500 }
    );
  }
}

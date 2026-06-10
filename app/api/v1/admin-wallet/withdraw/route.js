import axios from "axios";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import AdminWallet from "@/models/AdminWallet";
import AdminTransaction from "@/models/AdminTransaction";

export const runtime = "nodejs";

function valueOrEmpty(value) {
  return value ? value.toString() : "";
}

export async function POST(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  try {
    await connectToDatabase();

    const adminWallet = await AdminWallet.findOne({ admin: auth.admin._id });
    if (!adminWallet) {
      return NextResponse.json({ error: "Admin Wallet not found" }, { status: 404 });
    }

    const body = await request.json();
    const amount = Number(body.amount || 0);
    const narration = valueOrEmpty(body.narration) || "Withdrawal";

    if (!amount || Number.isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: "Valid amount is required" }, { status: 400 });
    }

    const merchantAccount = process.env.POOLER_MERCHANT_SETTLEMENT_ACCOUNT;
    const providerEnabled = Boolean(process.env.POOLER_APIKEY && merchantAccount);

    if (providerEnabled) {
      try {
        await axios.post(
          "https://api.poolerapp.com/api/v1/wallet/payments/intra",
          {
            narration,
            reference: `wd-${Date.now()}`,
            amount,
            from_account_number: adminWallet.account_no,
            to_account_number: merchantAccount,
            to_settlement: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.POOLER_APIKEY}`,
            },
          }
        );
      } catch (providerError) {
        return NextResponse.json(
          { error: providerError?.response?.data?.message || providerError.message },
          { status: 502 }
        );
      }
    }

    const adminTransaction = await AdminTransaction.create({
      amount: -Math.abs(amount),
      type: "Withdrawal",
      actor: narration,
      date: new Date(),
    });

    await AdminWallet.findByIdAndUpdate(adminWallet._id, {
      $push: { transactions: adminTransaction._id },
    });

    return NextResponse.json({
      message: "Settlement Completed successfully",
      adminTransaction,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

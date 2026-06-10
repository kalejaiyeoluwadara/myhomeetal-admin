import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import "@/models/User";
import Payment from "@/models/Payment";
import AdminWallet from "@/models/AdminWallet";

export const runtime = "nodejs";

export async function GET(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    await connectToDatabase();
    const adminWallet = await AdminWallet.findOne({ admin: auth.admin._id });

    if (!adminWallet) {
      return NextResponse.json({ error: "Admin Wallet not found" }, { status: 404 });
    }

    const payments = await Payment.find({ status: "Success" })
      .populate("userId", "firstname lastname")
      .sort({ date: -1 })
      .limit(100);

    // Keep response shape expected by current frontend component.
    return NextResponse.json({ adminWallet: { transactions: payments } });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch wallet transactions" },
      { status: 500 }
    );
  }
}

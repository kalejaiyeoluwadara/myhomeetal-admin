import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import AdminTransaction from "@/models/AdminTransaction";

export const runtime = "nodejs";

export async function GET(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    await connectToDatabase();

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const totalWithdrawal = await AdminTransaction.aggregate([
      {
        $match: {
          date: { $gte: twelveMonthsAgo },
          type: "Withdrawal",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $abs: "$amount" } },
        },
      },
    ]);

    const withdrawal = totalWithdrawal.length > 0 ? totalWithdrawal[0].total : 0;
    return NextResponse.json({
      totalWithdrawal: withdrawal,
      totalWithdrawals: withdrawal,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to calculate total withdrawals" },
      { status: 500 }
    );
  }
}

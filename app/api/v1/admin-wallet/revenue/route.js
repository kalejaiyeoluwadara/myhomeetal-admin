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

    const totalRevenue = await AdminTransaction.aggregate([
      {
        $match: {
          date: { $gte: twelveMonthsAgo },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;
    return NextResponse.json({ totalRevenue: revenue });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to calculate total revenue" },
      { status: 500 }
    );
  }
}

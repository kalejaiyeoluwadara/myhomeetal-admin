import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import Order from "@/models/Order";

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

    const totalSales = await Order.aggregate([
      {
        $match: {
          date: { $gte: twelveMonthsAgo },
          status: { $in: ["Ongoing", "Delivered"] },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$orderPrice" },
        },
      },
    ]);

    const sales = totalSales.length > 0 ? totalSales[0].total : 0;
    return NextResponse.json({ totalSales: sales });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to calculate total sales" },
      { status: 500 }
    );
  }
}

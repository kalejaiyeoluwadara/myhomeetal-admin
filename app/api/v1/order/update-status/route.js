import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import Order from "@/models/Order";

export const runtime = "nodejs";

export async function PUT(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    await connectToDatabase();
    const order = await Order.findOne({ orderId });

    if (order) {
      order.status = "Delivered";
      await order.save();
    }

    return NextResponse.json({ message: "Order status updated successfully", order });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to update order status" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import "@/models/User";
import "@/models/Product";
import "@/models/Address";
import Order from "@/models/Order";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const order = await Order.findById(params.id)
      .populate({
        path: "user",
        select: "firstname lastname email phone_number",
      })
      .populate({
        path: "orderItems.product",
        select: "productTitle",
      })
      .populate({
        path: "address",
        select: "deliveryAddress city phone_number",
      });

    if (!order) {
      return NextResponse.json({ error: "Order Not found" }, { status: 404 });
    }

    const orderItemsWithTitles = order.orderItems.map((item) => ({
      ...item.toObject(),
      productTitle: item.product ? item.product.productTitle : null,
    }));

    return NextResponse.json({
      ...order.toObject(),
      orderItems: orderItemsWithTitles,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch order" },
      { status: 500 }
    );
  }
}

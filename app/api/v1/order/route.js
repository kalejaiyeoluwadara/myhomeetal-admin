import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import "@/models/User";
import "@/models/Address";
import Order from "@/models/Order";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find()
      .populate("user", "firstname lastname")
      .populate("address", "deliveryAddress phone_number city");

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

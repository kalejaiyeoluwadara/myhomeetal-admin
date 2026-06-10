import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import "@/models/ProductCategory";
import "@/models/ProductSubCategory";
import "@/models/Inventory";
import Product from "@/models/Product";

export const runtime = "nodejs";

export async function GET(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    await connectToDatabase();
    const totalProducts = await Product.find()
      .populate("category", "name")
      .populate("inventory", "quantity")
      .populate("subCategory", "name");

    return NextResponse.json(totalProducts);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

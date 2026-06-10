import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  try {
    await connectToDatabase();

    const products = await Product.find({ category: params.id })
      .populate("category", "name")
      .populate("review", "rating")
      .populate("subCategory", "name subCategoryImage");

    return NextResponse.json(products.reverse());
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Oops! An error occurred, please refresh" },
      { status: 500 }
    );
  }
}

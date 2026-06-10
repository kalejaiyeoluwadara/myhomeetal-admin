import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import "@/models/Product";
import "@/models/ProductSubCategory";
import ProductCategory from "@/models/ProductCategory";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDatabase();
    const productCategories = await ProductCategory.find()
      .populate("products", "productTitle images price")
      .populate("subCategory", "name subCategoryImage");

    if (!productCategories) {
      return NextResponse.json({ error: "No Product Category found" }, { status: 404 });
    }

    return NextResponse.json(productCategories);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch product categories" },
      { status: 500 }
    );
  }
}

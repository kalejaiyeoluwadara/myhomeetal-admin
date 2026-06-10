import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductSubCategory from "@/models/ProductSubCategory";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  try {
    await connectToDatabase();
    const subCategoryDoc = await ProductSubCategory.findById(params.id);

    const products = await Product.find({ subCategory: params.id })
      .populate("category", "name product_category_image")
      .populate("subCategory", "name subCategoryImage");

    return NextResponse.json({
      subCategory: subCategoryDoc?.name || "",
      products,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Oops! An error occurred, please refresh" },
      { status: 500 }
    );
  }
}

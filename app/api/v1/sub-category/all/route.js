import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import "@/models/ProductCategory";
import Product from "@/models/Product";
import ProductSubCategory from "@/models/ProductSubCategory";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDatabase();
    const subcategories = await ProductSubCategory.find();

    if (!subcategories || subcategories.length === 0) {
      return NextResponse.json(
        { message: "No subcategories found.", subcategories: [] },
        { status: 200 }
      );
    }

    const subcategoriesWithProducts = await Promise.all(
      subcategories.map(async (subcategory) => {
        const products = await Product.find({ subCategory: subcategory._id })
          .populate("category", "name product_category_image")
          .populate("subCategory", "name subCategoryImage");

        return {
          ...subcategory.toObject(),
          products,
        };
      })
    );

    return NextResponse.json({
      message: "All SubCategory",
      subcategories: subcategoriesWithProducts,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

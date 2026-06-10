import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import ProductCategory from "@/models/ProductCategory";
import ProductSubCategory from "@/models/ProductSubCategory";

export const runtime = "nodejs";

export async function POST(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    await connectToDatabase();
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();
    const category = formData.get("category")?.toString();

    if (!name || !category) {
      return NextResponse.json(
        { message: "name and category are required" },
        { status: 400 }
      );
    }

    const existingSubCategory = await ProductSubCategory.findOne({ name });
    if (existingSubCategory) {
      return NextResponse.json(
        { message: `Subcategory with name ${name} already exists` },
        { status: 400 }
      );
    }

    const subCategory = new ProductSubCategory({
      name,
      category,
      subCategoryImage: null,
      createdBy: auth.admin.email,
      createdOn: new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" }),
    });

    const newSubCategory = await subCategory.save();

    const productsCategory = await ProductCategory.findByIdAndUpdate(
      category,
      { $push: { subCategory: newSubCategory._id } },
      { new: true }
    );

    if (!productsCategory) {
      return NextResponse.json(
        { message: `Category with ID ${category} not found while adding subcategory.` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Successfully created a new subcategory",
        subCategory: newSubCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

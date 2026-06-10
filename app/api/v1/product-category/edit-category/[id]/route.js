import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import ProductCategory from "@/models/ProductCategory";

export const runtime = "nodejs";

export async function PUT(request, { params }) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    await connectToDatabase();
    const formData = await request.formData();
    const name = formData.get("name")?.toString().trim();

    const existingCategory = await ProductCategory.findById(params.id);
    if (!existingCategory) {
      return NextResponse.json({ error: "Product Category not found" }, { status: 404 });
    }

    if (name) {
      const nameConflict = await ProductCategory.findOne({ name });
      if (nameConflict && nameConflict._id.toString() !== params.id) {
        return NextResponse.json(
          { error: "A product category with this name already exists." },
          { status: 400 }
        );
      }
    }

    const updatedProductCategory = await ProductCategory.findByIdAndUpdate(
      params.id,
      {
        name: name || existingCategory.name,
        product_category_image: existingCategory.product_category_image,
        updatedBy: auth.admin.email,
        updatedOn: new Date().toLocaleString("en-NG", {
          timeZone: "Africa/Lagos",
        }),
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Product category updated successfully",
      category: updatedProductCategory,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Oops! An error occurred, please refresh" },
      { status: 500 }
    );
  }
}

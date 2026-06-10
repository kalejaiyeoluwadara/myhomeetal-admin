import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import ProductCategory from "@/models/ProductCategory";
import ProductSubCategory from "@/models/ProductSubCategory";

export const runtime = "nodejs";

export async function DELETE(request, { params }) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    await connectToDatabase();
    const subCategory = await ProductSubCategory.findById(params.id);

    if (!subCategory) {
      return NextResponse.json(
        { message: "trying to delete an invalid Subcategory" },
        { status: 404 }
      );
    }

    if (subCategory.category) {
      await ProductCategory.findByIdAndUpdate(subCategory.category, {
        $pull: { subCategory: subCategory._id },
      });
    }

    await ProductSubCategory.findByIdAndDelete(params.id);
    return NextResponse.json({
      message: `successfully deleted sub category ${subCategory.name}`,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "internal error" },
      { status: 500 }
    );
  }
}

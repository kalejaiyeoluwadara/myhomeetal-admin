import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import ProductCategory from "@/models/ProductCategory";

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

    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const existingProductCategory = await ProductCategory.findOne({ name });
    if (existingProductCategory) {
      return NextResponse.json(
        { error: "A product category with this name already exists" },
        { status: 400 }
      );
    }

    // Image upload is intentionally skipped in local migration phase.
    const newProductCategory = new ProductCategory({
      name,
      product_category_image: null,
      createdBy: auth.admin.email,
      createdOn: new Date().toLocaleString("en-NG", {
        timeZone: "Africa/Lagos",
      }),
    });

    await newProductCategory.save();
    return NextResponse.json({ message: "Product category successfully created" });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

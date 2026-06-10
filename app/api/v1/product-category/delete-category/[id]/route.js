import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import ProductCategory from "@/models/ProductCategory";
import Product from "@/models/Product";
import Inventory from "@/models/Inventory";

export const runtime = "nodejs";

export async function DELETE(request, { params }) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    await connectToDatabase();

    const productCategory = await ProductCategory.findById(params.id);
    if (!productCategory) {
      return NextResponse.json({ error: "Product Category not found" }, { status: 404 });
    }

    for (const productId of productCategory.products || []) {
      const product = await Product.findById(productId);
      if (product?.inventory) {
        await Inventory.findByIdAndDelete(product.inventory);
      }
      await Product.findByIdAndDelete(productId);
    }

    await ProductCategory.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: "Product Category and all associated products and inventories deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}

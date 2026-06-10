import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import Product from "@/models/Product";
import Inventory from "@/models/Inventory";
import ProductCategory from "@/models/ProductCategory";
import ProductSubCategory from "@/models/ProductSubCategory";

export const runtime = "nodejs";

export async function DELETE(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  try {
    await connectToDatabase();
    const { productIds } = await request.json();

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ error: "No product IDs provided" }, { status: 400 });
    }

    const products = await Product.find({ _id: { $in: productIds } });
    const inventoryIds = products.map((p) => p.inventory).filter(Boolean);

    await Inventory.deleteMany({ _id: { $in: inventoryIds } });
    await Product.deleteMany({ _id: { $in: productIds } });
    await ProductCategory.updateMany(
      { products: { $in: productIds } },
      { $pull: { products: { $in: productIds } } }
    );
    await ProductSubCategory.updateMany(
      { products: { $in: productIds } },
      { $pull: { products: { $in: productIds } } }
    );

    return NextResponse.json({ message: "Selected products deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

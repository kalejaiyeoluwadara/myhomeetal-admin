import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import { uploadToCloudinary } from "@/lib/uploadImage";
import Product from "@/models/Product";
import Inventory from "@/models/Inventory";
import ProductCategory from "@/models/ProductCategory";
import ProductSubCategory from "@/models/ProductSubCategory";

export const runtime = "nodejs";

function valueOrEmpty(value) {
  return value ? value.toString() : "";
}

export async function POST(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  try {
    await connectToDatabase();
    const formData = await request.formData();

    const productTitle = valueOrEmpty(formData.get("productTitle"));
    const price = valueOrEmpty(formData.get("price"));
    const category = valueOrEmpty(formData.get("category"));
    const subCategory = valueOrEmpty(formData.get("subCategory"));
    const description = valueOrEmpty(formData.get("description"));
    const inventoryQuantity = Number(valueOrEmpty(formData.get("inventory")) || 0);

    if (!productTitle || !price || !category || !subCategory || !description) {
      return NextResponse.json(
        { error: "Missing required product fields" },
        { status: 400 }
      );
    }

    const newInventory = new Inventory({
      productName: productTitle,
      quantity: inventoryQuantity,
      createdBy: auth.admin.email,
      createdOn: new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" }),
    });
    await newInventory.save();

    const imageFiles = formData
      .getAll("images")
      .filter((file) => file && typeof file.name === "string" && file.name.length > 0);

    const imageUrls = (
      await Promise.all(imageFiles.map(async (file) => uploadToCloudinary(file)))
    ).filter(Boolean);

    const keyFeatures = formData
      .getAll("keyFeatures")
      .map((item) => valueOrEmpty(item).replace(/^\[|\]$/g, ""))
      .map((item) => item.trim())
      .filter(Boolean);

    const product = new Product({
      productTitle,
      price,
      category,
      subCategory,
      description,
      images: imageUrls,
      inventory: newInventory._id,
      brand: valueOrEmpty(formData.get("brand")),
      isProductNew: true,
      weight: valueOrEmpty(formData.get("weight")),
      modelNumber:
        valueOrEmpty(formData.get("modelNumber")) || valueOrEmpty(formData.get("modelno")),
      mainMaterial:
        valueOrEmpty(formData.get("mainMaterial")) ||
        valueOrEmpty(formData.get("mainmaterial")),
      color: valueOrEmpty(formData.get("color")),
      keyFeatures,
      size: valueOrEmpty(formData.get("size")),
      sku: valueOrEmpty(formData.get("sku")),
      createdBy: auth.admin.email,
      createdOn: new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" }),
    });
    await product.save();

    await ProductCategory.findByIdAndUpdate(category, {
      $addToSet: { products: product._id },
    });
    await ProductSubCategory.findByIdAndUpdate(subCategory, {
      $addToSet: { products: product._id },
    });

    return NextResponse.json({ message: "Product Created Successfully", product });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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

export async function GET(_request, { params }) {
  try {
    await connectToDatabase();
    const product = await Product.findById(params.id)
      .populate("category", "name")
      .populate("review", "rating comment date")
      .populate("inventory", "quantity createdBy createdOn")
      .populate("subCategory", "name");

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  try {
    await connectToDatabase();
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const previousCategoryId = product.category?.toString() || "";
    const previousSubCategoryId = product.subCategory?.toString() || "";

    const formData = await request.formData();
    const imagesToDelete = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("imagesToDelete") && value) {
        imagesToDelete.push(value.toString());
      }
    }
    if (imagesToDelete.length > 0) {
      product.images = (product.images || []).filter(
        (image) => !imagesToDelete.includes(image)
      );
    }

    const inventoryValue = valueOrEmpty(formData.get("inventory"));
    if (inventoryValue !== "") {
      const inventoryDoc = await Inventory.findById(product.inventory);
      if (inventoryDoc) {
        inventoryDoc.quantity = Number(inventoryValue);
        await inventoryDoc.save();
      }
    }

    const newFiles = formData
      .getAll("images")
      .filter((file) => file && typeof file.name === "string" && file.name.length > 0);
    if (newFiles.length > 0) {
      const newImageUrls = (
        await Promise.all(newFiles.map(async (file) => uploadToCloudinary(file)))
      ).filter(Boolean);
      product.images = [...(product.images || []), ...newImageUrls];
    }

    const keyFeatures = formData
      .getAll("keyFeatures")
      .map((item) => valueOrEmpty(item).replace(/^\[|\]$/g, ""))
      .map((item) => item.trim())
      .filter(Boolean);

    const newCategory = valueOrEmpty(formData.get("category")) || previousCategoryId;
    const newSubCategory =
      valueOrEmpty(formData.get("subCategory")) || previousSubCategoryId;

    product.productTitle = valueOrEmpty(formData.get("productTitle")) || product.productTitle;
    product.price = valueOrEmpty(formData.get("price")) || product.price;
    product.category = newCategory || product.category;
    product.subCategory = newSubCategory || product.subCategory;
    product.description = valueOrEmpty(formData.get("description")) || product.description;
    product.brand = valueOrEmpty(formData.get("brand")) || product.brand;
    product.weight = valueOrEmpty(formData.get("weight")) || product.weight;
    product.modelNumber =
      valueOrEmpty(formData.get("modelNumber")) ||
      valueOrEmpty(formData.get("modelno")) ||
      product.modelNumber;
    product.mainMaterial =
      valueOrEmpty(formData.get("mainMaterial")) ||
      valueOrEmpty(formData.get("mainmaterial")) ||
      product.mainMaterial;
    product.color = valueOrEmpty(formData.get("color")) || product.color;
    product.keyFeatures = keyFeatures.length > 0 ? keyFeatures : product.keyFeatures;
    product.size = valueOrEmpty(formData.get("size")) || product.size;
    product.sku = valueOrEmpty(formData.get("sku")) || product.sku;
    product.updatedBy = auth.admin.email;
    product.updatedOn = new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos" });
    await product.save();

    if (newCategory && newCategory !== previousCategoryId) {
      await ProductCategory.findByIdAndUpdate(previousCategoryId, {
        $pull: { products: product._id },
      });
      await ProductCategory.findByIdAndUpdate(newCategory, {
        $addToSet: { products: product._id },
      });
    }
    if (newSubCategory && newSubCategory !== previousSubCategoryId) {
      await ProductSubCategory.findByIdAndUpdate(previousSubCategoryId, {
        $pull: { products: product._id },
      });
      await ProductSubCategory.findByIdAndUpdate(newSubCategory, {
        $addToSet: { products: product._id },
      });
    }

    return NextResponse.json({ message: "Product updated successfully", product });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  try {
    await connectToDatabase();
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.inventory) {
      await Inventory.findByIdAndDelete(product.inventory);
    }
    await ProductCategory.findByIdAndUpdate(product.category, {
      $pull: { products: product._id },
    });
    await ProductSubCategory.findByIdAndUpdate(product.subCategory, {
      $pull: { products: product._id },
    });

    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

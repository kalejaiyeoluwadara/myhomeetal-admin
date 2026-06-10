import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import Product from "@/models/Product";
import Inventory from "@/models/Inventory";
import ProductCategory from "@/models/ProductCategory";
import ProductSubCategory from "@/models/ProductSubCategory";

export const runtime = "nodejs";

function equalsCI(a, b) {
  return a?.toLowerCase?.() === b?.toLowerCase?.();
}

export async function POST(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  try {
    await connectToDatabase();
    const products = await request.json();

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: "No products to publish" }, { status: 400 });
    }

    const publishedProductsIds = [];

    for (const productData of products) {
      let category = null;
      let subCategory = null;

      if (productData.category) {
        const allCategories = await ProductCategory.find({}, "name");
        category =
          allCategories.find((cat) => equalsCI(cat.name, productData.category)) || null;
        if (!category) {
          category = await ProductCategory.create({
            name: productData.category,
            products: [],
          });
        }
      }

      if (productData.subCategory) {
        const allSubCategories = await ProductSubCategory.find({}, "name");
        subCategory =
          allSubCategories.find((sub) => equalsCI(sub.name, productData.subCategory)) ||
          null;
        if (!subCategory) {
          subCategory = await ProductSubCategory.create({
            name: productData.subCategory,
            products: [],
            category: category?._id,
          });
        }
      }

      const inventory = await Inventory.create({
        productName: productData.productTitle,
        quantity: Number(productData.inventory || 0),
      });

      const product = await Product.create({
        productTitle: productData.productTitle,
        price: productData.price,
        category: category ? category._id : null,
        subCategory: subCategory ? subCategory._id : null,
        description: productData.description,
        images: Array.isArray(productData.images) ? productData.images : [],
        inventory: inventory._id,
        brand: productData.brand,
        isProductNew: true,
        weight: productData.weight,
        modelNumber: productData.modelNumber,
        mainMaterial: productData.mainMaterial,
        color: productData.color,
        size: productData.size,
        sku: productData.sku,
        keyFeatures: Array.isArray(productData.keyFeatures)
          ? productData.keyFeatures
          : [],
      });

      publishedProductsIds.push(product._id);

      if (category) {
        await ProductCategory.findByIdAndUpdate(category._id, {
          $addToSet: { products: product._id },
        });
      }
      if (subCategory) {
        await ProductSubCategory.findByIdAndUpdate(subCategory._id, {
          $addToSet: { products: product._id },
        });
      }
    }

    return NextResponse.json({ publishedProductsIds });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

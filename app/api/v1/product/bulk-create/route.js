import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/adminAuth";

export const runtime = "nodejs";

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"' && line[i + 1] === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export async function POST(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  try {
    const formData = await request.formData();
    const csvFile = formData.get("csvFile");

    if (!csvFile || typeof csvFile.text !== "function") {
      return NextResponse.json({ error: "csvFile is required" }, { status: 400 });
    }

    const csvText = await csvFile.text();
    const lines = csvText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length < 2) {
      return NextResponse.json([]);
    }

    const headers = parseCsvLine(lines[0]);
    const rows = lines.slice(1).map(parseCsvLine);

    const products = rows.map((values) => {
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] ?? "";
      });

      return {
        productTitle: row.productTitle,
        price: row.price,
        category: row.category,
        subCategory: row.subCategory,
        description: row.description,
        images: [row.image1, row.image2, row.image3, row.image4].filter(Boolean),
        inventory: row.inventory,
        brand: row.brand,
        weight: row.weight,
        modelNumber: row.modelNumber,
        mainMaterial: row.mainMaterial,
        color: row.color,
        size: row.size,
        sku: row.sku,
        keyFeatures: [
          row.feature1,
          row.feature2,
          row.feature3,
          row.feature4,
          row.feature5,
          row.feature6,
        ].filter(Boolean),
      };
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

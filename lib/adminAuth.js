import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/Admin";

function getBearerToken(request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return null;
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }

  return token;
}

export async function requireAdminAuth(request) {
  const token = getBearerToken(request);

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Authorization header missing or invalid" },
        { status: 401 }
      ),
    };
  }

  if (!process.env.JWT_SECRET) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Missing JWT_SECRET environment variable" },
        { status: 500 }
      ),
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await connectToDatabase();
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return {
        ok: false,
        response: NextResponse.json({ error: "Admin not found" }, { status: 401 }),
      };
    }

    return { ok: true, admin };
  } catch (error) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: error.message || "Unauthorized" },
        { status: 401 }
      ),
    };
  }
}

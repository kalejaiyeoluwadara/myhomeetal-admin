import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { requireAdminAuth } from "@/lib/adminAuth";

export const runtime = "nodejs";

export async function GET(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  if (auth.admin.role !== "Super Admin") {
    return NextResponse.json(
      { error: "Only Super Admin has access." },
      { status: 403 }
    );
  }

  try {
    await connectToDatabase();
    const employeeAdmins = await Admin.find({ role: "Employee Admin" });
    return NextResponse.json(employeeAdmins);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch employee admins" },
      { status: 500 }
    );
  }
}

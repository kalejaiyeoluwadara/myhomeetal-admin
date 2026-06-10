import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import Admin from "@/models/Admin";

export const runtime = "nodejs";

export async function PATCH(request, { params }) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  if (auth.admin.role !== "Super Admin") {
    return NextResponse.json(
      { error: "Only Super Admin can perform this action" },
      { status: 403 }
    );
  }

  try {
    await connectToDatabase();
    const employeeAdmin = await Admin.findById(params.id);
    if (!employeeAdmin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    employeeAdmin.isActive = true;
    await employeeAdmin.save();
    return NextResponse.json({
      message: "Employee Admin activated successfully",
      employeeAdmin,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

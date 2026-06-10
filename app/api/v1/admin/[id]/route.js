import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { requireAdminAuth } from "@/lib/adminAuth";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    await connectToDatabase();
    const adminProfile = await Admin.findById(params.id);

    if (!adminProfile) {
      return NextResponse.json({ error: "Admin Profile not found" }, { status: 404 });
    }

    return NextResponse.json(adminProfile);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch admin details" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  try {
    await connectToDatabase();
    let employeeAdmin = await Admin.findById(params.id);

    if (!employeeAdmin) {
      return NextResponse.json({ error: "Employee Admin not found" }, { status: 404 });
    }

    const body = await request.json();

    employeeAdmin.fullname = body.fullname ?? employeeAdmin.fullname;
    employeeAdmin.email = body.email ?? employeeAdmin.email;
    employeeAdmin.address = body.address ?? employeeAdmin.address;
    employeeAdmin.phone_no = body.phone_no ?? employeeAdmin.phone_no;
    employeeAdmin.gender = body.gender ?? employeeAdmin.gender;
    employeeAdmin.emergency_contact_name =
      body.emergency_contact_name ?? employeeAdmin.emergency_contact_name;
    employeeAdmin.emergency_contact_relationship =
      body.emergency_contact_relationship ??
      employeeAdmin.emergency_contact_relationship;
    employeeAdmin.emergency_contact_phone =
      body.emergency_contact_phone ?? employeeAdmin.emergency_contact_phone;
    employeeAdmin.position = body.position ?? employeeAdmin.position;
    employeeAdmin.start_date = body.start_date ?? employeeAdmin.start_date;
    employeeAdmin.employee_id = body.employee_id ?? employeeAdmin.employee_id;
    employeeAdmin.employment_type =
      body.employment_type ?? employeeAdmin.employment_type;
    employeeAdmin.salary = body.salary ?? employeeAdmin.salary;

    if (body.password) {
      employeeAdmin.password = await bcrypt.hash(body.password, 10);
    }

    employeeAdmin = await employeeAdmin.save();
    return NextResponse.json({
      message: "Employee Admin details updated successfully",
      employeeAdmin,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) {
    return auth.response;
  }

  if (auth.admin.role !== "Super Admin") {
    return NextResponse.json(
      { error: "Only Super Admin can perform this action" },
      { status: 403 }
    );
  }

  try {
    await connectToDatabase();
    await Admin.findByIdAndDelete(params.id);
    return NextResponse.json({
      message: "Employee Admin account deleted Successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "An error occured, please try again" },
      { status: 500 }
    );
  }
}

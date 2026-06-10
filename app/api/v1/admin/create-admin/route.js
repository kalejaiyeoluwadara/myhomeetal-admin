import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { requireAdminAuth } from "@/lib/adminAuth";
import { fileToDataUrl } from "@/lib/fileDataUrl";
import Admin from "@/models/Admin";

export const runtime = "nodejs";

function valueOrEmpty(value) {
  return value ? value.toString() : "";
}

export async function POST(request) {
  const auth = await requireAdminAuth(request);
  if (!auth.ok) return auth.response;

  if (auth.admin.role !== "Super Admin") {
    return NextResponse.json(
      { error: "Only Super Admin can create Employee Admin accounts." },
      { status: 403 }
    );
  }

  try {
    await connectToDatabase();
    const formData = await request.formData();

    const password = valueOrEmpty(formData.get("password"));
    const email = valueOrEmpty(formData.get("email"));

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json({ error: "Admin email already exists" }, { status: 409 });
    }

    const imageFile = formData.get("admin-image");
    const imageUrl = await fileToDataUrl(imageFile);
    const hashedPassword = await bcrypt.hash(password, 10);

    const employeeAdmin = new Admin({
      fullname: valueOrEmpty(formData.get("fullname")),
      image: imageUrl,
      email,
      role: "Employee Admin",
      password: hashedPassword,
      address: valueOrEmpty(formData.get("address")),
      phone_no: valueOrEmpty(formData.get("phone_no")),
      gender: valueOrEmpty(formData.get("gender")),
      emergency_contact_name: valueOrEmpty(formData.get("emergency_contact_name")),
      emergency_contact_relationship: valueOrEmpty(
        formData.get("emergency_contact_relationship")
      ),
      emergency_contact_phone: valueOrEmpty(formData.get("emergency_contact_phone")),
      employee_id: valueOrEmpty(formData.get("employee_id")),
      position: valueOrEmpty(formData.get("position")),
      start_date: valueOrEmpty(formData.get("start_date")),
      employment_type: valueOrEmpty(formData.get("employment_type")),
      salary: valueOrEmpty(formData.get("salary")),
      isActive: true,
    });

    await employeeAdmin.save();
    return NextResponse.json(
      { message: "Employee Admin account created successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 422 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 422 }
      );
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { error: "Missing JWT_SECRET environment variable" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "100d" }
    );

    const adminProfile = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
      phone_no: admin.phone_no,
      image: admin.image,
      address: admin.address,
      gender: admin.gender,
      emergency_contact_name: admin.emergency_contact_name,
      emergency_contact_phone: admin.emergency_contact_phone,
      emergency_contact_relationship: admin.emergency_contact_relationship,
      start_date: admin.start_date,
      employment_type: admin.employment_type,
      salary: admin.salary,
      position: admin.position,
      fullname: admin.fullname,
    };

    return NextResponse.json({ token, adminProfile });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

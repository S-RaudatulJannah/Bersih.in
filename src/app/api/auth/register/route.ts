import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi" },
        { status: 400 },
      );
    }

    const [rows]: any = await pool.query(
      "SELECT id FROM User WHERE email = ?",
      [email],
    );

    if (rows.length > 0) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 },
      );
    }

    const userId = uuidv4();
    const finalRole = role === "ADMIN" ? "ADMIN" : "USER";

    await pool.query(
      "INSERT INTO User (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [userId, name, email, password, finalRole],
    );

    return NextResponse.json(
      {
        message: "Registrasi berhasil",
        user: { id: userId, name, email, role: finalRole },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}

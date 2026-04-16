import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { error: "Status tidak boleh kosong" },
        { status: 400 },
      );
    }

    await pool.query("UPDATE Laporan SET status = ? WHERE id = ?", [
      status,
      params.id,
    ]);

    return NextResponse.json({
      message: "Status berhasil diubah",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await pool.query("DELETE FROM Laporan WHERE id = ?", [params.id]);

    return NextResponse.json({ message: "Laporan berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

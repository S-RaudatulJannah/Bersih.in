import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { pool } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM Laporan ORDER BY tanggal_laporan DESC",
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = (session.user as any).id;

    const formData = await request.formData();
    const nama_pelapor = formData.get("nama_pelapor") as string;
    const lokasi = formData.get("lokasi") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const foto = formData.get("foto") as File;

    if (!foto) {
      return NextResponse.json(
        { error: "Foto wajib diupload" },
        { status: 400 },
      );
    }

    const bytes = await foto.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${foto.name.replace(/\s+/g, "-")}`;
    const bucketName = process.env.S3_BUCKET_NAME!;

    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: foto.type,
    });

    await s3Client.send(putCommand);

    const foto_url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    const id = uuidv4();
    const status = "Menunggu";

    await pool.query(
      "INSERT INTO Laporan (id, nama_pelapor, lokasi, deskripsi, foto_url, status, userId) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, nama_pelapor, lokasi, deskripsi || null, foto_url, status, userId],
    );

    return NextResponse.json(
      { message: "Laporan berhasil disimpan" },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

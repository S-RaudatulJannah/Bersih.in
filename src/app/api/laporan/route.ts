import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    // TODO: Fetch from database
    const laporan = [
      {
        id: 1,
        nama_pelapor: 'John Doe',
        lokasi: 'Jl. Merdeka No. 5',
        tanggal_laporan: new Date().toISOString(),
        status: 'Menunggu',
        foto_url: null,
      },
    ]
    return NextResponse.json(laporan)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const nama_pelapor = formData.get('nama_pelapor')
    const lokasi = formData.get('lokasi')
    const foto = formData.get('foto') as File

    // TODO: Save to database and upload to S3
    // TODO: Return saved laporan

    return NextResponse.json({ message: 'Laporan berhasil disimpan' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

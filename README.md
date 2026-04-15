# Bersih.in - Sistem Pelaporan Sampah Liar (Next.js)

Aplikasi modern untuk melaporkan dan mengelola sampah liar dengan design minimalist yang elegan.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Modern Minimalist Design
- **Database**: PostgreSQL (setup di backend)
- **Icons**: Lucide React
- **API**: Next.js API Routes

## 📦 Setup & Installation

### 1. Install Dependencies

```bash
cd d:\Coolyeah\samvah-nextjs
npm install
npm install lucide-react
```

### 2. Setup Environment Variables

Copy file `.env.local.example` ke `.env.local`:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/samvah_liar
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
NEXT_PUBLIC_AWS_BUCKET_NAME=your_bucket
NEXT_PUBLIC_AWS_REGION=ap-southeast-1
```

### 3. Setup Database

```bash
# Create PostgreSQL database
createdb samvah_liar

# Setup tables (create migration file nanti)
```

### 4. Run Development Server

```bash
npm run dev
```

Buka browser: **http://localhost:3000**

## 📂 Project Structure

```
samvah-nextjs/
├── src/
│   ├── app/
│   │   ├── api/              # API Routes
│   │   │   └── laporan/
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/           # React components
│   │   ├── Header.tsx
│   │   ├── LaporanForm.tsx
│   │   └── LaporanTable.tsx
│   └── lib/                  # Utilities & helpers
├── package.json
├── tailwind.config.ts
├── next.config.js
└── .env.local.example
```

## ✨ Features

- ✅ Form input untuk laporan sampah
- ✅ Tabel interaktif daftar laporan
- ✅ Update status laporan (Menunggu/Diangkut)
- ✅ Hapus laporan
- ✅ Preview foto dari S3
- ✅ Design modern & responsive
- ✅ Smooth animations & transitions

## 🎨 Design Highlights

- Modern Minimalist aesthetic
- Gradient accents (Primary + Accent colors)
- Smooth shadows & glass morphism effects
- Tailwind CSS utility-first approach
- Responsive mobile-first design
- Accessible components

## 📝 Next Steps

- [ ] Integrate with PostgreSQL database
- [ ] Setup AWS S3 upload functionality
- [ ] Add database migration scripts
- [ ] Add authentication/authorization
- [ ] Add form validation
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add success notifications
- [ ] Deploy to Vercel/production

## 🛠️ Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy ke Vercel:
```bash
npm install -g vercel
vercel
```

---

**Dibuat dengan ❤️ untuk lingkungan yang lebih bersih**

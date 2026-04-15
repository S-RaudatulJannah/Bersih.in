# Bersih.in - Full Stack

Sistem Pelaporan Sampah Liar dengan Next.js + React (Frontend) dan Express.js (Backend)

## 📁 Project Structure

```
Bersih.in-nextjs/
├── backend/              # Express.js REST API
│   ├── src/
│   ├── database.sql
│   ├── package.json
│   └── README.md
├── src/                  # Next.js Frontend
│   ├── app/
│   ├── components/
│   └── ...
├── public/
├── package.json
└── README.md
```

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env

# Edit .env dengan konfigurasi Anda
# Setup database PostgreSQL

npm run dev
```

Backend akan berjalan di: **http://localhost:5000**

### Frontend Setup

```bash
npm install
cp .env.local.example .env.local

# Pastikan NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm run dev
```

Frontend akan berjalan di: **http://localhost:3000**

## 📊 Architecture

```
┌─────────────────────────────┐
│     Next.js Frontend        │
│   (http://localhost:3000)   │
└────────────┬────────────────┘
             │ API Calls
             ↓
┌─────────────────────────────┐
│   Express.js Backend        │
│   (http://localhost:5000)   │
└────────────┬────────────────┘
             │
      ┌──────┴──────┐
      ↓             ↓
  PostgreSQL      AWS S3
  Database        Storage
```

## ✨ Features

✅ Modern UI dengan Next.js + React  
✅ RESTful API dengan Express.js  
✅ PostgreSQL Database  
✅ AWS S3 File Upload  
✅ TypeScript Type Safety  
✅ Responsive Design  
✅ Error Handling  

## 📚 Documentation

- [Backend README](./backend/README.md) - Express.js API documentation
- [Frontend README](./README.md) - Next.js setup guide

---

**Dibuat untuk lingkungan yang lebih bersih 🌍**

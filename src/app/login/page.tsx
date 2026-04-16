"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email atau password salah");
      } else {
        router.push("/lapor"); // redirect to dashboard or lapor
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-dark-200 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-6 h-6 text-primary-700" />
          </div>
          <h2 className="text-3xl font-bold text-dark-900 mb-2">
            Selamat Datang
          </h2>
          <p className="text-dark-600">Masuk untuk mulai melaporkan</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-dark-900">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-dark-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/10 outline-none transition-all"
              placeholder="user@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-dark-900">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-dark-200 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/10 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 disabled:opacity-50 transition-all shadow-sm"
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-dark-600">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-primary-700 font-semibold hover:text-primary-800"
          >
            Daftar di sini
          </Link>
        </div>
      </div>
    </div>
  );
}

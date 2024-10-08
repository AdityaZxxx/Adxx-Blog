"use client";

import { FC } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

// Tipe untuk komponen
const LoginPage: FC = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "authenticated") {
    router.push("/"); // Redirect ke halaman utama jika sudah login
  }

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-800 rounded-xl">
      <div className="p-8 rounded-lg border-y-2 border-gray-500 shadow-lg max-w-sm w-full bg-gray-800 ">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-white text-white">Login</h1>
        <div className="space-y-4">
          {/* Login dengan Google */}
          <button
            onClick={() => signIn("google")}
            className="w-full py-3 px-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Sign in with Google
          </button>

          {/* Login dengan GitHub */}
          <button
            onClick={() => signIn("github")}
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-900 transition"
          >
            Sign in with GitHub
          </button>

          {/* Login dengan Facebook */}
          <button
            onClick={() => signIn("facebook")}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

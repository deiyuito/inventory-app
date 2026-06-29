"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("ログイン失敗");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 p-6 border rounded">
      <span>※下記でログイン</span>
      <p>
        （メールアドレス：admin@test.com）
        <br />
        （パスワード：password123）
      </p>
      <input
        placeholder="メールアドレス"
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="パスワード"
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="bg-black text-white px-4 py-2 w-full">ログイン</button>
    </form>
  );
}

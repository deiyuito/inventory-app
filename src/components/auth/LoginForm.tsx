"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    <div>
      <h1 className="text-3xl text-center font-bold pb-6">
        在庫管理システム ログイン
      </h1>
      <form
        onSubmit={handleLogin}
        className="rounded-lg space-y-2 p-6 border rounded w-100"
      >
        <p className="font-bold">メールアドレス</p>
        <input
          placeholder="admin@test.com"
          className="rounded-lg border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="font-bold mt-2">パスワード</p>
        <input
          type="password123"
          placeholder="パスワード"
          className="rounded-lg border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="text-lg bg-black text-white font-bold px-4 py-5 my-5 w-full">
          ログイン
        </Button>
      </form>
      <p>※下記でログイン</p>
      <p>・メールアドレス：admin@test.com</p>
      <p>・パスワード：password123</p>
    </div>
  );
}

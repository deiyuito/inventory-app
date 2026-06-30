import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("======== Middleware ========");
  console.log("PATH:", pathname);

  const token = req.cookies.get("token")?.value;

  console.log("TOKEN:", token);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname === "/login"
  ) {
    console.log("Skip middleware");
    return NextResponse.next();
  }

  if (!token) {
    console.log("❌ tokenなし");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    jwt.verify(token, process.env.JWT_SECRET!);

    console.log("✅ verify成功");

    return NextResponse.next();
  } catch (e) {
    console.error("❌ verify失敗", e);

    return NextResponse.redirect(new URL("/login", req.url));
  }
}

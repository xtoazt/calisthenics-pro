import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Skip middleware for public routes
  const publicRoutes = ["/", "/account", "/quiz"]
  const url = request.nextUrl.clone()

  if (
    publicRoutes.some((route) => url.pathname === route) ||
    url.pathname.includes("/_next") ||
    url.pathname.includes("/api") ||
    url.pathname.includes("/favicon.ico")
  ) {
    return NextResponse.next()
  }

  // Check for user in cookies (server-side storage)
  const user = request.cookies.get("user")?.value
  const quizCompleted = request.cookies.get("quizCompleted")?.value

  // If no user, redirect to account page
  if (!user) {
    url.pathname = "/account"
    return NextResponse.redirect(url)
  }

  // If user exists but quiz not completed, redirect to quiz
  if (!quizCompleted && !url.pathname.includes("/quiz")) {
    url.pathname = "/quiz"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Skip middleware for public routes and static files
  const publicRoutes = ["/", "/account", "/quiz"]
  const url = request.nextUrl.clone()
  const path = url.pathname

  if (
    publicRoutes.some((route) => path === route) ||
    path.includes("/_next") ||
    path.includes("/api") ||
    path.includes("/favicon.ico") ||
    path.includes(".svg") ||
    path.includes(".png") ||
    path.includes(".jpg") ||
    path.includes(".jpeg")
  ) {
    return NextResponse.next()
  }

  // Check for user in cookies (server-side storage)
  const user = request.cookies.get("user")?.value
  const quizCompleted = request.cookies.get("quizCompleted")?.value

  // If no user, redirect to account page
  if (!user) {
    // Store the original URL to redirect back after login
    const response = NextResponse.redirect(new URL("/account", request.url))
    response.cookies.set("redirectUrl", path, {
      path: "/",
      maxAge: 60 * 5, // 5 minutes
      httpOnly: true,
    })
    return response
  }

  // If user exists but quiz not completed, redirect to quiz
  if (!quizCompleted && !path.includes("/quiz")) {
    return NextResponse.redirect(new URL("/quiz", request.url))
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

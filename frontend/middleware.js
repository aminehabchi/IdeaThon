import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Skip middleware for API routes, static files, and public assets
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/static/')
  ) {
    return NextResponse.next()
  }

  // Define protected routes
  // uncomment the routes you want to protect
  const protectedRoutes = [
    // '/create',
    // '/ideas',
    // '/profile',
    // '/report',
    // '/checkout',
  ]

  // Check if current path matches any protected route
  // This will match:
  // /create -> true
  // /create/publish -> true (starts with /create)
  // /ideas -> true
  // /ideas/123 -> true (starts with /ideas)
  // /profile/edit -> true (starts with /profile)
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // If it's a protected route and no token exists, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    // Add the attempted URL as a query parameter for redirect after login
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Match all routes except static files and API routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
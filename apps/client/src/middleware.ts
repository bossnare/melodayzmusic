import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const publicRoutes = ['/auth/login', '/auth/register', ''];
const protectedRoutes = ['/dashboard'];

export default function middleware(req: NextRequest) {
  const cookie = req.cookies.get('access_token');
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.includes(path);

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

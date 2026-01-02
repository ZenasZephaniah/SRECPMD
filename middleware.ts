import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Check for Basic Auth header
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // 2. Define your dummy credentials
  // Requirement: "Eligible admins can access"
  const user = 'admin';
  const pwd = 'password123';

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [u, p] = atob(authValue).split(':');

    if (u === user && p === pwd) {
      return NextResponse.next();
    }
  }

  // 3. If not logged in, show the login prompt
  url.pathname = '/api/auth';
  return new NextResponse('Auth Required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Dashboard"',
    },
  });
}

export const config = {
  matcher: ['/'], // Protects the home page
};
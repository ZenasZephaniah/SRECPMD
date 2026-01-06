import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // PASS EVERYTHING THROUGH
  return NextResponse.next();
}

export const config = {
  // Stop watching all paths
  matcher: [],
};
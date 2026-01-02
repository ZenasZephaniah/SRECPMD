import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  // Simple Admin Check
  if (username === 'admin' && password === 'password123') {
    const response = NextResponse.json({ success: true });
    
    // Set a cookie named "auth_token"
    response.cookies.set('auth_token', 'logged-in', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    
    return response;
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
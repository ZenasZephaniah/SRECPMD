import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    
    if (username === 'admin' && password === 'password123') {
      const response = NextResponse.json({ success: true });

      
      response.cookies.set('token', 'logged-in-securely', {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/', 
        maxAge: 60 * 60 * 24, // 1 day
      });
      
      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
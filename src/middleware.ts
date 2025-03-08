import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('@App:token');

  // Rotas que precisam de autenticação
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // Aqui você pode adicionar verificação adicional para permissões de admin
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
}; 
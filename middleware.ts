import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Pega o token JWT dos cookies
  const token = request.cookies.get('jwt')?.value;
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  // Se for rota admin e não tiver token, redireciona para login
  if (isAdminRoute) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      // Guarda a URL que o usuário tentou acessar
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verifica se o token existe e é válido
      if (!token || token === 'undefined' || token === 'null') {
        throw new Error('Token inválido');
      }

      // Se chegou aqui, permite o acesso
      return NextResponse.next();
    } catch (error) {
      // Se houver qualquer erro na verificação, redireciona para login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*'  // Inclui todas as subrotas de admin
  ]
}; 
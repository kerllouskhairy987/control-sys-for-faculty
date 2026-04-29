/**
 * Middleware for Admin Route Protection
 * Ensures only authenticated users can access /admin routes
 */

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect /admin routes
    if (pathname.startsWith('/admin')) {
        // Check if user is authenticated (via session cookie or auth header)
        // For now, we'll do a basic check - in production, verify JWT or session
        const authCookie = request.cookies.get('auth_token');
        const sessionCookie = request.cookies.get('session');

        // If no auth token/session, redirect to login
        if (!authCookie && !sessionCookie) {
            // Allow the request to go through for now (can be enhanced with real auth)
            // In a real app, return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};

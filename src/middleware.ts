import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/verifyToken';

const LOGIN_PATH = '/login';
const PUBLIC_PATHS = [LOGIN_PATH, '/forgot-password', '/reset-password'];
const STUDENT_HOME = '/student/dashboard';
const ADMIN_HOME = '/admin';

function redirectTo(path: string, request: NextRequest) {
    return NextResponse.redirect(new URL(path, request.url));
}

function clearAuthCookies(response: NextResponse) {
    response.cookies.delete('jwt');
    response.cookies.delete('refreshToken');
    response.cookies.delete('refreshTokenExpiresOn');
    return response;
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('jwt')?.value;
    const isPublicPath = PUBLIC_PATHS.includes(pathname);

    if (!token) {
        if (isPublicPath) {
            return NextResponse.next();
        }

        return redirectTo(LOGIN_PATH, request);
    }

    const decodedToken = verifyToken(token);
    const isExpired = decodedToken?.exp
        ? decodedToken.exp * 1000 <= Date.now()
        : true;

    if (!decodedToken || isExpired) {
        return clearAuthCookies(redirectTo(LOGIN_PATH, request));
    }

    const isStudent = decodedToken.roles === 'Student';

    if (isPublicPath) {
        return redirectTo(isStudent ? STUDENT_HOME : ADMIN_HOME, request);
    }

    if (isStudent && !pathname.startsWith('/student')) {
        return redirectTo(STUDENT_HOME, request);
    }

    if (!isStudent && !pathname.startsWith('/admin')) {
        return redirectTo(ADMIN_HOME, request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

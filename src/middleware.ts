import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authentificationMiddleware from './lib/middleware/authentification/middleware' 
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) { 

    // Loggin out
    // if(request.nextUrl.pathname === "/logout"){
    //     request.cookies.delete("Authorization");
    //     request.cookies.delete("Refresh");
    //     return NextResponse.redirect(new URL('/login',request.url));
    // }
    // console.log(request.cookies)
    
    // Authorizations
    const authorization = authentificationMiddleware(request);
    if(authorization === undefined && request.nextUrl.pathname !== "/login") return NextResponse.redirect(new URL("/login", request.url))
    else if(authorization !== undefined && request.nextUrl.pathname === "/login") return NextResponse.redirect(new URL("/dashboard", request.url))
        
    const res = NextResponse.next()
    return res
}
 
export const config = {
    matcher: [
        '/login', 
        '/dashboard/:path*'
    ],
  }
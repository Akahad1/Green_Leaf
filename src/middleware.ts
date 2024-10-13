/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "./app/helpers/jwtHelpers";

const authRoutes = ["/login", "/singup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    //Protecting All routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          pathname ? `/login?redirect=${pathname}` : "/login",
          request.url
        )
      );
    }
  }

  //Role based authorization

  let decodedToken = null;

  decodedToken = decode(accessToken) as any;

  const role = decodedToken?.role;

  if (role === "admin" && !pathname.match("/deshbord/myContent")) {
    return NextResponse.next();
  }
  if (role === "admin" && !pathname.match("/deshbord/myFollower")) {
    return NextResponse.next();
  }
  if (role === "admin" && !pathname.match("/deshbord/myFollowing")) {
    return NextResponse.next();
  }

  if (role === "user" && !pathname.match("/deshbord/activiy")) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/singup",
    "/",

    "/deshbord/myContent",
    "/deshbord/myFollower",
    "/deshbord/myFollowing",
    "/deshbord/activiy",

    "/deshbord/allUser",
    "/profile",
    "/imageGallery",
    "/aboutUs",
  ],
};

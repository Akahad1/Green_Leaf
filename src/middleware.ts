/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "./app/helpers/jwtHelpers";

const authRoutes = ["/login", "/singup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(pathname, "pathname");

  const accessToken = cookies().get("accessToken")?.value;
  console.log("accessToken1", accessToken);

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

  console.log(decodedToken, "decodedToken");

  const role = decodedToken?.role;

  console.log(role, "role");
  console.log(pathname, "pathname");

  if (role === "admin" && !pathname.match("/Deshbord/myContent")) {
    return NextResponse.next();
  }
  if (role === "admin" && !pathname.match("/Deshbord/myFollower")) {
    return NextResponse.next();
  }
  if (role === "admin" && !pathname.match("/Deshbord/myFollowing")) {
    return NextResponse.next();
  }

  if (role === "user" && !pathname.match("/Deshbord/Activiy")) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/singup",
    "/",
    "/dashboard/:page*",
    "/userDeshbord",
    "/Deshbord/myContent",
    "/Deshbord/myFollower",
    "/Deshbord/myFollowing",
    "/Deshbord/Activiy",
    "/adminDeshbord",
    "/Deshbord",
    "/Deshbord/allUser",
    "/profile",
    "/imageGallery",
    "/aboutUs",
  ],
};

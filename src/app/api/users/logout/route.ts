import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            status: 200,
            message: "Logout successful!",
            success: true,
        });
        response.cookies.set("token", "", {
            httpOnly: true,
            maxAge: 0,
            expires: new Date(0),
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            message: error?.response?.data?.message || "Something went wrong!",
        });
    }
}

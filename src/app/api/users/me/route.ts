import { connectDB } from "@/db/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request);
        const user = await User.findOne({ _id: userID }).select("-password");

        return NextResponse.json({
            status: 200,
            message: "User found",
            user,
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 401,
            body: {
                message: error.message,
            },
        });
    }
}

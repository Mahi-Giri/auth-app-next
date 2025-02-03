import { connectDB } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const userExist = await User.findOne({ email });
        if (!userExist) return NextResponse.json({ error: "User does not exist" }, { status: 400 });

        const validPassword = await bcryptjs.compare(password, userExist.password);
        if (!validPassword)
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

        const tokenData = {
            id: userExist._id,
            email: userExist.email,
            username: userExist.username,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        // const { password: userPassword, ...user } = userExist._doc;

        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development",
            sameSite: "strict",
            maxAge: 86400,
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
    const route = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDisable, setButtonDisable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const onLogin = async () => {
        if (!validateEmail(user.email)) {
            toast.error("Enter valid email Format");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            toast.success(response.data.message || "Login successful!");
            route.push("/dashboard");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (user.email.length > 0 && validateEmail(user.email) && user.password.length > 0) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [user]);

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center"
            style={{
                backgroundImage:
                    'url("https://as1.ftcdn.net/v2/jpg/08/68/51/04/1000_F_868510427_vsvN67LV1zSmLMyXMOFG05tRCmTAj1xL.jpg")',
            }}
        >
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg opacity-70 w-[28%]">
                <h1 className="text-2xl font-bold mb-4">{loading ? "Loading..." : "Login"}</h1>

                <label htmlFor="email" className="block mb-1">
                    Email
                </label>
                <input
                    className="p-2 w-full border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                />
                {user.email && !validateEmail(user.email) && (
                    <p className="text-red-500 text-sm mb-2">Enter valid email Format</p>
                )}

                <label htmlFor="password" className="block mb-1">
                    Password
                </label>
                <input
                    className="p-2 w-full border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />

                <button
                    className="p-2 w-full bg-blue-500 text-white rounded-lg mb-4 hover:bg-blue-600 transition disabled:bg-gray-400"
                    onClick={onLogin}
                    disabled={buttonDisable}
                >
                    {buttonDisable ? "Please enter valid details" : "Login"}
                </button>

                <div>
                    <span>Don't have an account? </span>
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

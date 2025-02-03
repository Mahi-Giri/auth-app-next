"use client";

import React from "react";
import Link from "next/link";

const LoginPage = () => {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {};

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center"
            style={{
                backgroundImage:
                    'url("https://as1.ftcdn.net/v2/jpg/08/68/51/04/1000_F_868510427_vsvN67LV1zSmLMyXMOFG05tRCmTAj1xL.jpg")',
            }}
        >
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg opacity-70 w-[28%]">
                <h1 className="text-2xl font-bold mb-4">Login</h1>

                <label htmlFor="email" className="block mb-1">
                    Email
                </label>
                <input
                    className="p-2 w-full border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                />

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
                    className="p-2 w-full bg-blue-500 text-white rounded-lg mb-4 hover:bg-blue-600 transition"
                    onClick={onLogin}
                >
                    Login
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

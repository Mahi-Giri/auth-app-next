"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        username: "",
        password: "",
    });

    const [buttonDisable, setButtonDisable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log(response.data);
            toast.success(response.data.message);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
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
                <h1 className="text-2xl font-bold mb-4">{loading ? "Loading..." : "Sign Up"}</h1>

                <label htmlFor="username" className="block mb-1">
                    Username
                </label>
                <input
                    className="p-2 w-full border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"
                />

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
                    onClick={onSignup}
                >
                    {buttonDisable ? "Pleas enter credential" : "Sign Up"}
                </button>
                <div>
                    <span>Do you have an account? </span>
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;

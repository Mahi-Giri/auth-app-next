"use client";

import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UserProfilePage = () => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful!");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            Profile
            <hr />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default UserProfilePage;

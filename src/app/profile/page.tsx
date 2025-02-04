"use client";

import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserProfilePage = () => {
    const router = useRouter();
    const [userID, setUserID] = React.useState<any>("");

    const handleLogout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful!");
            router.push("/login");
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    };

    const getUserDetails = async () => {
        try {
            const { data } = await axios.get("/api/users/me");
            setUserID(data.user._id);
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            Profile
            <h2 className="bg-gray-400 mb-3 p-2 rounded-md cursor-pointer">
                {userID ? <Link href={`/profile/${userID}`}>{userID}</Link> : "Don't have a user"}
            </h2>
            <hr />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                onClick={getUserDetails}
            >
                Get user
            </button>
        </div>
    );
};

export default UserProfilePage;

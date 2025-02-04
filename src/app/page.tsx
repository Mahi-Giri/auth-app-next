"use client";

import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            Profile
            <hr />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                    router.push("/profile");
                }}
            >
                go to profile
            </button>
        </div>
    );
}

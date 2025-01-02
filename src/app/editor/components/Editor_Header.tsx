"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin, MdLogout } from "react-icons/md";

export const EditorHeader: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLogOut = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/logout", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                sessionStorage.clear();
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="w-full h-12 flex justify-between items-center px-4 fixed top-0 bg-white z-50 border-b">
            <Link href="/">
                <div className="flex items-end gap-2">
                    <p className="text-xl font-light font-heading1">Deauth</p>
                </div>
            </Link>

            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-8 h-8 rounded-full flex justify-center items-center hover:bg-black/[0.05]"
                >
                    <CgProfile className="text-[20px]" />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-50">
                        <ul>
                            <li>
                                <Link href="/auth/login">
                                    <div className="flex gap-2 items-center px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        <span>Login</span>
                                        <MdOutlineLogin />
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogOut}
                                    className="w-full flex gap-2 items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    <span>Logout</span>
                                    <MdLogout />
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

const Header = () => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [logoutMessage, setLogoutMessage] = useState<string>(""); // Çıkış mesajı

    useEffect(() => {
        // Kullanıcı verisini localStorage'dan al
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            // Kullanıcıyı JSON formatında parse et
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        // Çıkış yap: localStorage'ı temizle
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);

        // Çıkış mesajını göster
        setLogoutMessage("Çıkış işleminiz başarılı!");
        setTimeout(() => setLogoutMessage(""), 3000); // 3 saniye sonra mesajı kaldır
    };

    return (
        <div className="font-sans bg-orange shadow-md fixed top-0 w-full z-50">
            <div className="max-w-6xl mx-auto container flex items-center justify-between h-16">
                <div className="flex items-center">
                    <img src="/logo.png" alt="Logo" className="h-12 w-auto mr-3" />
                    <div className="text-white font-bold text-lg">Kitchen</div>
                    <div className="text-white font-medium text-lg ml-1">Catering</div>
                </div>

                <div className="hidden md:flex flex-1 mx-6">
                    <input
                        type="text"
                        placeholder="Yemek tarifi ara"
                        className="w-full px-4 py-4 rounded-md focus:outline-none"
                    />
                    <button className="ml-2 bg-orange2 text-white px-4 py-0 hover:bg-white hover:text-orange2 rounded-md transition">
                        Tarif Ara
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="relative group">
                            <button className="flex items-center space-x-2 text-white px-4 py-2 bg-orange2 rounded-md">
                                <IoPersonCircleOutline size={30} className="text-white" />
                                <div>{user.username}</div>
                            </button>

                            <div className="absolute right-0 mt-2 w-48 bg-white border border-orange rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-150 z-50">
                                <Link
                                    href="/Favoriler"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Favoriler
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    Çıkış Yap
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="relative group">
                            <button className="flex items-center space-x-2 text-orange px-4 py-2 bg-white rounded-md">
                                <IoPersonCircleOutline size={30} className="text-orange" />
                                <div>Giriş Yap</div>
                            </button>

                            <div className="absolute right-0 mt-2 w-48 bg-white border border-orange rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-150 z-50">
                                <Link
                                    href="/Login"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Giriş Yap
                                </Link>

                                <Link
                                    href="/Register"
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Üye Ol
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {logoutMessage && (
                <div className="fixed top-16 w-full text-center bg-green-100 text-green-800 py-2">
                    {logoutMessage}
                </div>
            )}
        </div>
    );
};

export default Header;

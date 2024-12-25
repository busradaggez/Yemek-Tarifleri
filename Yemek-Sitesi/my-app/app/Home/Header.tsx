"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoPersonCircleOutline, IoHome } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Header = () => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [logoutMessage, setLogoutMessage] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);

        setLogoutMessage("Çıkış işleminiz başarılı!");
        setTimeout(() => {
            setLogoutMessage("");
            router.push("/Login"); // Çıkış yaptıktan sonra Login sayfasına yönlendirme
        }, 1500);
    };

    return (
        <div className="font-sans bg-orange shadow-md fixed top-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                {/* Logo */}
                <div className="flex items-center">
                    <img src="/logo.png" alt="Logo" className="h-12 w-auto ml-0" />
                    <div className="text-white font-bold text-lg ml-2">Kitchen</div>
                    <div className="text-white font-medium text-lg ml-1">Catering</div>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center text-white px-4 py-2 rounded-md">
                        <IoHome size={30} className="text-white hover:text-orange2" />
                    </Link>

                    {user ? (
                        <div className="relative group">
                            <button className="flex items-center space-x-2 text-white px-4 py-2 bg-orange2 rounded-md">
                                <IoPersonCircleOutline size={30} className="text-white " />
                                <div>{user.username}</div>
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-orange rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-150 z-50">
                                <Link
                                    href="/KullaniciBilgisi"
                                    className="block px-4 py-2 text-gray-700 hover:bg-orange hover:text-white hover:font-bold"
                                >
                                    Profil
                                </Link>
                                <Link
                                    href="/Favoriler"
                                    className="block px-4 py-2 text-gray-700 hover:bg-orange hover:text-white hover:font-bold"
                                >
                                    Favoriler
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block px-4 py-2 text-gray-700 hover:bg-orange hover:text-white hover:font-bold w-full text-left"
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

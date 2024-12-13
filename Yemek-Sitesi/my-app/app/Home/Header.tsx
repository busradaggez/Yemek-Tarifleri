import Link from 'next/link';
import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";


const Header = () => {
    return (
        <div className="font-sans bg-orange shadow-md fixed top-0 w-full z-50">
            <div className="max-w-6xl mx-auto container flex items-center justify-between h-16">
                <div className="flex items-center">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-12 w-auto mr-3"
                    />
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
                    <div className="relative group">
                        <button className="flex items-center space-x-2 text-orange px-4 py-2 bg-white rounded-md">
                            <IoPersonCircleOutline
                                size={30}
                                className='text-orange'
                            />
                            <div>Giriş Yap</div>
                        </button>

                        <div className="absolute right-0 mt-2 w-48 bg-white border border-orange rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition duration-150 z-50">
                            {/* Giriş Yap Link'i */}
                            <Link href="/Login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Giriş Yap
                            </Link>

                            {/* Üye Ol Link'i */}
                            <Link href="/Register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                Üye Ol
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Header
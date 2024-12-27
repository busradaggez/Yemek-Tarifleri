"use client";
import Link from "next/link";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { IoPersonCircleOutline, IoHome, IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { fetchRecipes } from "../utils/api/recipe";

interface Recipe {
    id: number;
    name: string;
    image: string;
}

function debounce(func: (...args: any[]) => void, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: any[]) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const Header = () => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [logoutMessage, setLogoutMessage] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState("");
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const [isGuestMenuOpen, setIsGuestMenuOpen] = useState<boolean>(false);
    const guestMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target as Node)

            ) {
                setRecipes([]);
                setIsProfileMenuOpen(false); // Profil menüsünü kapat
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);

        setLogoutMessage("Çıkış işleminiz başarılı!");
        setTimeout(() => {
            setLogoutMessage("");
            router.push("/Login");
        }, 1500);
    };

    const handleSearch = useCallback(
        debounce(async (searchTerm: string) => {
            if (searchTerm.trim() === "") {
                setRecipes([]);
                return;
            }
            try {
                const result = await fetchRecipes(searchTerm);
                const filteredRecipes = result.filter((recipe: any) =>
                    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setRecipes(filteredRecipes);
            } catch (error) {
                console.error("Hata: Tarifler getirilemedi.", error);
                setRecipes([]);
            }
        }, 500),
        []
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value;
        setSearchQuery(searchTerm);
        handleSearch(searchTerm);
    };

    const navigateToRecipe = (id: number) => {
        setRecipes([]);
        setSearchQuery("");
        router.push(`/Detay/${id}`);
    };

    return (
        <div className="font-sans bg-orange shadow-md fixed top-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                <div className="flex items-center">
                    <img src="/logo.png" alt="Logo" className="h-12 w-auto ml-0" />
                    <div className="text-white font-bold text-lg ml-2 hidden lg:block">Kitchen</div>
                    <div className="text-white font-medium text-lg ml-1 hidden lg:block">Catering</div>
                </div>
                <div className="flex items-center space-x-4">
                    <div ref={dropdownRef} className="relative flex items-center bg-white rounded-md px-2 py-1">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleChange}
                            placeholder="Tarif ara..."
                            className="px-2 py-1 outline-none text-gray-700"
                        />
                        <button className="text-orange bg-gray-100 px-4 py-2 rounded-r-lg">
                            <IoSearch size={20} />
                        </button>
                        {recipes.length > 0 && (
                            <ul className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-auto">
                                {recipes.map((recipe) => (
                                    <li
                                        key={recipe.id}
                                        onClick={() => navigateToRecipe(recipe.id)}
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <img
                                            src={recipe.image}
                                            alt={recipe.name}
                                            className="w-10 h-10 rounded-full mr-4 object-cover"
                                        />
                                        <span className="text-black truncate">{recipe.name}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <Link href="/" className="flex items-center text-white px-4 py-2 rounded-md">
                        <IoHome size={30} className="text-white hover:text-orange2" />
                    </Link>
                    {user ? (
                        <div ref={profileMenuRef} className="relative">
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="flex items-center space-x-2 text-white px-4 py-2 bg-orange2 rounded-md"
                            >
                                <IoPersonCircleOutline size={30} className="text-white " />
                                <div>{user.username}</div>
                            </button>
                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-orange rounded-md shadow-lg z-50">
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
                            )}
                        </div>
                    ) : (
                        <div className="relative" ref={guestMenuRef}>
                            <button
                                onClick={() => setIsGuestMenuOpen((prev: boolean) => !prev)}
                                className="flex items-center space-x-2 text-orange px-4 py-2 bg-white rounded-md"
                            >
                                <IoPersonCircleOutline size={30} className="text-orange" />
                                <div>Giriş Yap</div>
                            </button>
                            {isGuestMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-orange rounded-md shadow-lg z-50">
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
                            )}
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

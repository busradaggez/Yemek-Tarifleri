"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { removeFavorite } from "@/utils/store/favoriteSlice";

const Favoriler = () => {
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const dispatch = useDispatch();
    const router = useRouter();

    if (favorites.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center">
                    <p className="text-2xl font-semibold text-gray-600">
                        Favoriler listeniz boş.
                    </p>
                </div>
            </div>
        );
    }

    const handleGoToDetail = (id: number) => {
        router.push(`/Detay/${id}`);
    };

    const handleRemoveFavorite = (id: number) => {
        dispatch(removeFavorite(id));
    };

    return (
        <div className="min-h-screen bg-background3 bg-cover bg-no-repeat bg-center bg-opacity-80 py-10">
            <div className="container mx-auto px-6">
                <h1 className=" mt-12 text-4xl font-bold text-center bg-orange2 text-white mb-8">
                    Favoriler
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden relative"
                        >
                            <button
                                onClick={() => handleRemoveFavorite(recipe.id)}
                                className="absolute top-2 right-2 text-2xl"
                            >
                                <FaHeart color="#FFA500" />
                            </button>
                            <img
                                src={recipe.image}
                                alt={recipe.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-black text-center truncate">
                                    {recipe.name}
                                </h2>
                                <button
                                    onClick={() => handleGoToDetail(recipe.id)}
                                    className="mt-4 w-full bg-orange text-white py-2 px-4 rounded hover:bg-orange2"
                                >
                                    Detaya Git
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Favoriler;

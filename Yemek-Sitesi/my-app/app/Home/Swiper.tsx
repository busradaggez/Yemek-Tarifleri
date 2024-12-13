'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";



interface Recipe {
    id: number;
    name: string;
    image: string;
}

const SwiperPage = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/recipes");
                setRecipes(response.data.recipes);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []);

    if (loading) {
        return <div className="text-center text-gray-500">Yükleniyor...</div>;
    }
    return (
        <div className="container mx-auto p-4 mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2">
                    <Swiper
                        navigation={true}
                        className="rounded-lg overflow-hidden shadow-lg"
                    >
                        {recipes.map((recipe) => (
                            <SwiperSlide key={recipe.id}>
                                <div className="relative">
                                    <img
                                        src={recipe.image}
                                        alt={recipe.name}
                                        className="w-full h-96 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
                                        <h2 className="text-2xl font-bold">{recipe.name}</h2>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Sağ Liste */}
                <div className="space-y-4">
                    {recipes.slice(0, 5).map((recipe) => (
                        <div
                            key={recipe.id}
                            className="flex items-center bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <img
                                src={recipe.image}
                                alt={recipe.name}
                                className="w-24 h-24 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-md font-bold truncate">{recipe.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SwiperPage;

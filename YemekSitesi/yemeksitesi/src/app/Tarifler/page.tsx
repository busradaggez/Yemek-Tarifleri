"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store/store";
import { addFavorite, removeFavorite } from "../../utils/store/favoriteSlice";
import { getAllRecipes } from "../../utils/api/recipe";
import { FaHeart } from "react-icons/fa";
import Filtre from "../../components/Filtre";
import { Recipe } from "../../utils/types"; // Recipe türünü içe aktar

const Tarifler = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visibleCount, setVisibleCount] = useState<number>(8);
    const router = useRouter();
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.items);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipesData = await getAllRecipes();
                setRecipes(recipesData);
                setFilteredRecipes(recipesData); // Tüm tarifler başlangıçta filtrelenmiş olarak ayarlanır
                setLoading(false);
            } catch (error) {
                console.error("Tarifleri alırken hata oluştu:", error);
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 8);
    };

    const handleRecipeClick = (id: number) => {
        router.push(`/Detay/${id}`);
    };

    const handleFavoriteClick = (recipe: Recipe) => {
        const isFavorited = favorites.some((item) => item.id === recipe.id);

        if (isFavorited) {
            dispatch(removeFavorite(recipe.id));
        } else {
            dispatch(addFavorite(recipe));
        }
    };

    return (
        <div className="container mx-auto p-4 flex">
            <div className="w-3/4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredRecipes.slice(0, visibleCount).map((recipe) => {
                        const isFavorited = favorites.some((item) => item.id === recipe.id);

                        return (
                            <div
                                key={recipe.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden border-4 p-2 border-orange relative"
                            >
                                <button
                                    onClick={() => handleFavoriteClick(recipe)}
                                    className="absolute top-2 right-2 text-2xl"
                                >
                                    <FaHeart color={isFavorited ? "#FFA500" : "gray"} />
                                </button>
                                <img
                                    src={recipe.image}
                                    alt={recipe.name}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <div className="p-8 text-center">
                                    <h3 className="text-lg font-bold truncate">{recipe.name}</h3>
                                    <div className="text-sm text-gray-500">Zorluk: {recipe.difficulty}</div>
                                    <div className="text-sm text-gray-500">Mutfak: {recipe.cuisine}</div>
                                    <div className="text-sm text-gray-500">
                                        Kalori: {recipe.caloriesPerServing} kcal
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            onClick={() => handleRecipeClick(recipe.id)}
                                            className="bg-orange text-white px-4 py-2 rounded-lg hover:bg-orange2"
                                        >
                                            Tarife Git
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {visibleCount < filteredRecipes.length && (
                    <div className="text-center mt-8">
                        <button
                            onClick={handleShowMore}
                            className="px-6 py-2 bg-orange text-white rounded-lg hover:bg-orange2"
                        >
                            Daha Fazla Göster
                        </button>
                    </div>
                )}
            </div>

            <div className="w-1/4 pl-6">
                <Filtre setFilteredRecipes={setFilteredRecipes} />
            </div>
        </div>
    );
};

export default Tarifler;

'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Recipe {
    id: number;
    name: string;
    image: string;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
}

const RecipeCard = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/recipes");
                console.log(response.data);
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
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                    >

                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-24 h-24 object-cover"
                        />

                        <div className="p-4">
                            <h3 className="text-lg font-bold truncate">{recipe.name}</h3>
                            <p className="text-sm text-gray-500">
                                Zorluk: {recipe.difficulty}
                            </p>
                            <p className="text-sm text-gray-500">
                                Mutfak: {recipe.cuisine}
                            </p>
                            <p className="text-sm text-gray-500">
                                Kalori: {recipe.caloriesPerServing} kcal
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeCard;

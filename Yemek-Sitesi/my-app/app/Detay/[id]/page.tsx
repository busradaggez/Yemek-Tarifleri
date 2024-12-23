"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import { addFavorite, removeFavorite } from "@/utils/store/favoriteSlice";
import { getRecipeById } from "@/utils/api/recipe";
import { FaHeart } from "react-icons/fa";
import Header from "@/app/Home/Header";

interface RecipeDetail {
    id: number;
    name: string;
    image: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    rating: number;
    reviewCount: number;
    mealType: string;
}

const Detay = () => {
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [showMessage, setShowMessage] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/Login");
        } else {
            setIsLoggedIn(true);
        }

        if (!id) return;

        const fetchRecipe = async () => {
            try {
                const recipeData = await getRecipeById(id);
                setRecipe(recipeData);
                setLoading(false);
            } catch (error) {
                console.error("Tarif detaylarını alırken hata oluştu:", error);
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id, router]);

    const isFavorited = recipe && favorites.some((item) => item.id === recipe.id);

    const handleFavoriteClick = () => {
        if (!recipe) return;

        if (isFavorited) {
            dispatch(removeFavorite(recipe.id));
            setShowMessage("Tarif favorilerden kaldırılmıştır.");
        } else {
            dispatch(addFavorite({ id: recipe.id, name: recipe.name, image: recipe.image }));
            setShowMessage("Tarif favorilerinize eklenmiştir.");
        }

        setTimeout(() => setShowMessage(""), 3000);
    };

    if (loading) {
        return <div className="text-center text-gray">Yükleniyor...</div>;
    }

    if (!recipe) {
        return <div className="text-center text-orange2">Tarif bulunamadı.</div>;
    }

    return (

        <div className="flex justify-center items-center min-h-screen bg-background2 bg-no-repeat bg-cover bg-center mt-16">
            {showMessage && (
                <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-auto px-6 py-2 bg-green-100 text-green-800 rounded shadow-md">
                    {showMessage}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full text-left relative">
                {isLoggedIn && (
                    <button
                        onClick={handleFavoriteClick}
                        className="absolute top-4 right-4 text-3xl transition duration-300"
                    >
                        <FaHeart color={isFavorited ? "#FFA500" : "gray"} />
                    </button>
                )}

                <h1 className="text-4xl font-bold text-orange mb-4 text-center">{recipe.name}</h1>
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-96 object-cover rounded-lg mx-auto mb-4"
                />
                <p className="text-black">
                    <strong>Zorluk:</strong> {recipe.difficulty}
                </p>
                <p className="text-black">
                    <strong>Mutfak:</strong> {recipe.cuisine}
                </p>
                <p className="text-black">
                    <strong>Kalori:</strong> {recipe.caloriesPerServing} kcal
                </p>
                <p className="text-black">
                    <strong>Hazırlık Süresi:</strong> {recipe.prepTimeMinutes} dakika
                </p>
                <p className="text-black">
                    <strong>Pişirme Süresi:</strong> {recipe.cookTimeMinutes} dakika
                </p>
                <p className="text-black">
                    <strong>Kişi Sayısı:</strong> {recipe.servings}
                </p>
                <p className="text-black">
                    <strong>Etiketler:</strong> {recipe.tags.join(", ")}
                </p>
                <p className="text-black">
                    <strong>Puan:</strong> {recipe.rating} / 5 ({recipe.reviewCount} yorum)
                </p>

                <div className="mt-6">
                    <h2 className="text-lg font-bold text-black">Malzemeler</h2>
                    <ul className="list-disc ml-6 text-left inline-block">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-bold text-black">Talimatlar</h2>
                    <ol className="list-decimal ml-6 text-left inline-block">
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Detay;

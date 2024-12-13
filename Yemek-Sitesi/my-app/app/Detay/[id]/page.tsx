'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getRecipeById } from '@/utils/api/recipe';

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
    const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // `id`'yi string olarak güvence altına alıyoruz
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    useEffect(() => {
        if (!id) return; // Eğer id yoksa hiçbir şey yapma

        const fetchRecipe = async () => {
            try {
                const recipeData = await getRecipeById(id); // API'dan tarif detaylarını al
                setRecipe(recipeData);
                setLoading(false);
            } catch (error) {
                console.error('Tarif detaylarını alırken hata oluştu:', error);
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return <div className="text-center text-gray">Yükleniyor...</div>;
    }

    if (!recipe) {
        return <div className="text-center text-orange2">Tarif bulunamadı.</div>;
    }

    return (
        <div className="container mx-auto p-4 flex justify-center items-center min-h-screen  bg-background2 bg-no-repeat bg-cover bg-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full text-left ">
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
                    <strong>Etiketler:</strong> {recipe.tags.join(', ')}
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

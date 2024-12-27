'use client';
import { useEffect, useState } from "react";
import axios from "axios";

type Recipe = {
    id: number;
    name: string;
    ingredients: string[];
    mealType: string; // öğün
    difficulty: string;
    cuisine: string; // mutfak
    caloriesPerServing: number;
    tags: string[]; // Örneğin: ["defterimde", "videolarda"]
};

const RecipeFilter = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [filters, setFilters] = useState({
        search: "",
        includeIngredients: "",
        excludeIngredients: "",
        mealType: [] as string[],
        difficulty: [] as string[],
        cuisine: [] as string[],
        tags: [] as string[], // Şunları Göster
    });

    useEffect(() => {
        // API'dan veri çekme
        const fetchRecipes = async () => {
            try {
                const response = await axios.get<Recipe[]>("/utils/api/recipe");
                setRecipes(response.data);
                setFilteredRecipes(response.data);
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            }
        };

        fetchRecipes();
    }, []);

    // Filtreleri uygulama
    useEffect(() => {
        const applyFilters = () => {
            const result = recipes.filter((recipe) => {
                const {
                    search,
                    includeIngredients,
                    excludeIngredients,
                    mealType,
                    difficulty,
                    cuisine,
                    tags,
                } = filters;

                const matchesSearch = search
                    ? recipe.name.toLowerCase().includes(search.toLowerCase())
                    : true;

                const includesIngredients = includeIngredients
                    ? includeIngredients.split(",").every((ing) =>
                        recipe.ingredients.some((ri) =>
                            ri.toLowerCase().includes(ing.trim().toLowerCase())
                        )
                    )
                    : true;

                const excludesIngredients = excludeIngredients
                    ? excludeIngredients.split(",").every(
                        (ing) =>
                            !recipe.ingredients.some((ri) =>
                                ri.toLowerCase().includes(ing.trim().toLowerCase())
                            )
                    )
                    : true;

                const matchesMealType = mealType.length
                    ? mealType.includes(recipe.mealType)
                    : true;

                const matchesDifficulty = difficulty.length
                    ? difficulty.includes(recipe.difficulty)
                    : true;

                const matchesCuisine = cuisine.length
                    ? cuisine.includes(recipe.cuisine)
                    : true;

                const matchesTags = tags.length
                    ? tags.every((tag) => recipe.tags.includes(tag))
                    : true;

                return (
                    matchesSearch &&
                    includesIngredients &&
                    excludesIngredients &&
                    matchesMealType &&
                    matchesDifficulty &&
                    matchesCuisine &&
                    matchesTags
                );
            });

            setFilteredRecipes(result);
        };

        applyFilters();
    }, [filters, recipes]);

    // Checkbox güncelleme fonksiyonu
    const toggleFilter = (key: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: prev[key as keyof typeof filters].includes(value)
                ? (prev[key as keyof typeof filters] as string[]).filter(
                    (item) => item !== value
                )
                : [...(prev[key as keyof typeof filters] as string[]), value],
        }));
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtrele</h2>
            <div className="space-y-4">
                {/* Arama Kelimesi */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Arama Kelimesi
                    </label>
                    <input
                        type="text"
                        placeholder="Yemek tarifi veya yazar ara"
                        className="border border-gray-300 p-2 w-full rounded"
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                search: e.target.value,
                            }))
                        }
                    />
                </div>

                {/* Öğün */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Öğün
                    </label>
                    <div className="space-y-2">
                        {["Kahvaltı", "Öğle", "Akşam"].map((meal) => (
                            <div key={meal} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={meal}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    checked={filters.mealType.includes(meal)}
                                    onChange={() => toggleFilter("mealType", meal)}
                                />
                                <label
                                    htmlFor={meal}
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    {meal}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Zorluk */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zorluk
                    </label>
                    <div className="space-y-2">
                        {["Kolay", "Orta", "Zor"].map((difficulty) => (
                            <div key={difficulty} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={difficulty}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    checked={filters.difficulty.includes(difficulty)}
                                    onChange={() =>
                                        toggleFilter("difficulty", difficulty)
                                    }
                                />
                                <label
                                    htmlFor={difficulty}
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    {difficulty}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mutfak */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mutfak
                    </label>
                    <div className="space-y-2">
                        {["Türk", "İtalyan", "Çin"].map((cuisine) => (
                            <div key={cuisine} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={cuisine}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    checked={filters.cuisine.includes(cuisine)}
                                    onChange={() => toggleFilter("cuisine", cuisine)}
                                />
                                <label
                                    htmlFor={cuisine}
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    {cuisine}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Şunları Göster */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Şunları Göster
                    </label>
                    <div className="space-y-2">
                        {[
                            "Defterimde",
                            "Takip Ettiklerimde",
                            "Videolarda",
                            "Blog",
                            "Liste",
                            "Menü",
                            "Kaç Kalori",
                        ].map((tag) => (
                            <div key={tag} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={tag}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    checked={filters.tags.includes(tag)}
                                    onChange={() => toggleFilter("tags", tag)}
                                />
                                <label
                                    htmlFor={tag}
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    {tag}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeFilter;

"use client";
import React, { useEffect, useState } from "react";
import { fetchRecipes } from "../utils/api/recipe";
import { Recipe } from "../utils/types";
import { FaFilter } from "react-icons/fa";

const Filtre = ({ setFilteredRecipes }: { setFilteredRecipes: (recipes: Recipe[]) => void }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [difficulties, setDifficulties] = useState<string[]>([]);
    const [cuisines, setCuisines] = useState<string[]>([]);
    const [mealTypes, setMealTypes] = useState<string[]>([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
    const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
    const [minCalories, setMinCalories] = useState<number>(0);
    const [maxCalories, setMaxCalories] = useState<number | undefined>(undefined);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        const fetchAndSetRecipes = async () => {
            try {
                const recipesData: Recipe[] = await fetchRecipes();
                setRecipes(recipesData);

                const uniqueDifficulties = Array.from(
                    new Set(recipesData.map((recipe) => recipe.difficulty))
                );
                setDifficulties(uniqueDifficulties);

                const uniqueCuisines = Array.from(new Set(recipesData.map((recipe) => recipe.cuisine)));
                setCuisines(uniqueCuisines);

                const uniqueMealTypes = Array.from(
                    new Set(recipesData.flatMap((recipe) => recipe.mealType))
                );
                setMealTypes(uniqueMealTypes);
            } catch (error) {
                console.error("Veri çekme hatası:", error);
            }
        };

        fetchAndSetRecipes();
    }, []);

    const toggleFilterMenu = () => {
        setIsFilterOpen((prev) => !prev);
    };

    const handleCheckboxChange = (
        value: string,
        type: "difficulty" | "cuisine" | "mealType"
    ) => {
        if (type === "difficulty") {
            setSelectedDifficulties((prev) =>
                prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
            );
        } else if (type === "cuisine") {
            setSelectedCuisines((prev) =>
                prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
            );
        } else if (type === "mealType") {
            setSelectedMealTypes((prev) =>
                prev.includes(value) ? prev.filter((m) => m !== value) : [...prev, value]
            );
        }
    };

    return (
        <div>
            {/* Filter Button (Only for mobile) */}
            <button
                onClick={toggleFilterMenu}
                className="fixed bottom-4 right-4 bg-orange p-4 rounded-full shadow-lg z-50 lg:hidden"
            >
                <FaFilter size={24} color="white" />
            </button>

            {/* Filter Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg z-40 p-4 transform transition-transform duration-300 ${isFilterOpen ? "translate-x-0" : "translate-x-full"
                    } lg:static lg:translate-x-0 lg:w-80 lg:h-auto lg:p-0 lg:shadow-none lg:bg-transparent`}
            >
                <h2 className="text-lg font-bold mb-4 lg:hidden">Filtreler</h2>

                {/* Difficulty Filter */}
                <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2">Zorluk Seviyesi</h3>
                    <div className="max-h-32 overflow-y-auto custom-scrollbar">
                        {difficulties.map((difficulty) => (
                            <label key={difficulty} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="checkbox"
                                    value={difficulty}
                                    onChange={() => handleCheckboxChange(difficulty, "difficulty")}
                                    className="h-4 w-4"
                                />
                                <span className="text-sm">{difficulty}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Cuisine Filter */}
                <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2">Mutfak Türü</h3>
                    <div className="max-h-32 overflow-y-auto custom-scrollbar">
                        {cuisines.map((cuisine) => (
                            <label key={cuisine} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="checkbox"
                                    value={cuisine}
                                    onChange={() => handleCheckboxChange(cuisine, "cuisine")}
                                    className="h-4 w-4"
                                />
                                <span className="text-sm">{cuisine}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Meal Type Filter */}
                <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2">Öğün Türü</h3>
                    <div className="max-h-32 overflow-y-auto custom-scrollbar">
                        {mealTypes.map((mealType) => (
                            <label key={mealType} className="flex items-center space-x-2 mb-2">
                                <input
                                    type="checkbox"
                                    value={mealType}
                                    onChange={() => handleCheckboxChange(mealType, "mealType")}
                                    className="h-4 w-4"
                                />
                                <span className="text-sm">{mealType}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Calories Filter */}
                <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2">Kalori Aralığı</h3>
                    <div className="flex items-center space-x-4">
                        <input
                            type="number"
                            placeholder="Min"
                            value={minCalories}
                            onChange={(e) => setMinCalories(Number(e.target.value) || 0)}
                            className="w-20 p-2 border rounded"
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxCalories ?? ""}
                            onChange={(e) => setMaxCalories(Number(e.target.value) || undefined)}
                            className="w-20 p-2 border rounded"
                        />
                    </div>
                </div>

                {/* Close Button (Only for mobile) */}
                <button
                    onClick={toggleFilterMenu}
                    className="mt-16 absolute top-4 right-4 bg-orange2 text-white px-4 py-2 rounded-lg shadow-lg lg:hidden"
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default Filtre;

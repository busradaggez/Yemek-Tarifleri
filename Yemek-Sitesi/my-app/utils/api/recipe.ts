import axios from "axios";

const BASE_URL = "https://dummyjson.com/recipes";

export const getAllRecipes = async () => {
    const response = await axios.get(BASE_URL);
    return response.data.recipes;
};

export const getRecipeById = async (id: string) => {
    const response = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (!response.ok) {
        throw new Error('Tarif bulunamadı');
    }
    return response.json();
};

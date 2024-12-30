import axios from "axios";

const BASE_URL = "https://dummyjson.com/recipes";

export const getAllRecipes = async () => {
    const response = await axios.get(BASE_URL);
    return response.data.recipes;
};

export const getRecipeById = async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error("Tarif bulunamadı");
    }
    return response.json();
};

export const fetchRecipes = async (query?: string) => {
    const url = query
        ? `https://dummyjson.com/recipes?query=${query}`
        : 'https://dummyjson.com/recipes';
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Veri çekilemedi');
    }
    const data = await response.json();
    return data.recipes;
};
export default { getAllRecipes, getRecipeById, fetchRecipes };
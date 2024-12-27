import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Recipe {
    id: number;
    name: string;
    image: string;
}

interface FavoriteState {
    items: Recipe[];
}

const initialState: FavoriteState = {
    items: [],
};

const favoriteSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Recipe>) => {
            const exists = state.items.some((item) => item.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
            }
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;

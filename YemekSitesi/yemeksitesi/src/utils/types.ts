export type Recipe = {
    id: number;
    name: string;
    difficulty: string;
    cuisine: string;
    image: string;
    caloriesPerServing: number;
    mealType: string[]; // mealType artık bir dizi
};
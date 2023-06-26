export function listIngredients(ingredientData) {
    const ingredientsList = [];
    
    for (let i = 1; i <= 15; i++) {
        const ingredient = ingredientData[`strIngredient${i}`];
        
        if (ingredient) {
        ingredientsList.push(ingredient);
        }
    }
    
    return ingredientsList;
}

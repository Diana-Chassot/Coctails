import { checkStatusResponse } from "./checkStatusResponse.js";
import { showSpinner, hideSpinner } from "./spinner.js";
import { DrinkModal } from "./classDrink.js";
import { listIngredients } from "./listIngridients.js";
import { cleanContent } from "./cleanContent.js";
import { checkMatch } from "./match.js";
import { createDrink } from "./classDrink.js"; 
import { showMessage, hideMessage } from "./messageDrinkNotFound.js";


export async function getDrinksByName(name) {
    try {
    showSpinner()    
    const response = await fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await checkStatusResponse(response);
    return data.drinks;
    }
    catch (error) {
    console.error(error);
    }
    finally{
    hideSpinner()
    }
};

export async function getDrinksByAlcohol(alcohol) {
    try {
    showSpinner()    
    const response = await fetch(`https://thecocktaildb.com/api/json/v1/1/filter.php?a=${alcohol}`);
    const data = await checkStatusResponse(response);
    return data.drinks;
    }
    catch (error) {
    console.error(error);
    }
    finally{
    hideSpinner()
    }
};

export async function getDrinksByIngredient(ingredient) {
    try {
    showSpinner()    
    const response = await fetch(`https://thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await checkStatusResponse(response);
    return data.drinks;
    }
    catch (error) {
    console.error(error);
    }
    finally{
    hideSpinner()
    }
};
export async function getDrinksByCategory(category) {
    try {
    showSpinner()    
    const response = await fetch(`https://thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await checkStatusResponse(response);
    return data.drinks;
    }
    catch (error) {
    console.error(error);
    }
    finally{
    hideSpinner()
    }
};

export async function getDrinkById(id) {
    try {
    showSpinner()    
    const responseId = await fetch(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const dataById = await checkStatusResponse(responseId);

    const drinkbyId = dataById.drinks;
    
    const ingridientsList = listIngredients(drinkbyId[0]) 
    
    const newDrinkModal = new DrinkModal(drinkbyId[0], ingridientsList);
    newDrinkModal.renderModal();
    }
    catch (error) {
    console.error(error);
    }
    finally{
    hideSpinner()
    }
};

export async function getDrinks( selectedKeyAlckohol, selectedKeyIngridient, selectedKeyName ) {

    try {
    hideMessage()
    showSpinner()

        if (selectedKeyIngridient) {
        const drinksByIngridients = await getDrinksByIngredient(selectedKeyIngridient);
        const drinksAlckohol = await getDrinksByAlcohol(selectedKeyAlckohol);
        const matchingDrinks = checkMatch(drinksByIngridients, drinksAlckohol);

            if (matchingDrinks.length === 0) {
            cleanContent()
            showMessage();
            }
            else {
            cleanContent()
            createDrink(matchingDrinks)
            }
        }
        else if (selectedKeyName) {
        const drinksByName = await getDrinksByName(selectedKeyName);
            
            if (drinksByName.length === 0) {
            cleanContent()    
            showMessage();
            }
            else {
            cleanContent()
            createDrink(drinksByName)
            }
        };
    }
    catch (error) {
        console.error(error);
        
        cleanContent()
        showMessage()
    }
    finally{
        hideSpinner()
    }
};

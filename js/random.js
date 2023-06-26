import { Drink} from "./utils/classDrink.js";
import { checkStatusResponse } from "./utils/checkStatusResponse.js";
import { showSpinner, hideSpinner } from "./utils/spinner.js";


(async function () {
    try {
        showSpinner()
        const response = await fetch(`https://thecocktaildb.com/api/json/v1/1/random.php`);
        const data = await checkStatusResponse(response);
        const randomDrink = data.drinks;
        const newDrink = new Drink(randomDrink[0]);
        newDrink.renderDrink()

        hideSpinner()
    } 
    catch (error) {
    showCard()
    hideSpinner()    
    console.error(error);
    }
    
})();

function showCard() {
const card = document.querySelector(".card-random")
card.style.display = "block";
}

function hideCard(){
const card = document.querySelector(".card-random")
card.style.display = "none";
}
hideCard()
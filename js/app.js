
/* CheckStatusResponse */

function checkStatusResponse(response) {

    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Error');
    }

};

/* Show Spinner  */

function showSpinner() {

    const spinner = document.querySelector(".spinner");
    spinner.style.display = "block";

};

/* Hide Spinner  */

function hideSpinner() {

    const spinner = document.querySelector(".spinner");
    spinner.style.display = "none";

};

/* Message "drink not found" */
function showMessage() {

    const message = document.querySelector(".message");
    message.style.display = "block";

}


function selectedKeyValues() {

    const selectedKeyAlckohol = document.getElementById('select-alckohol').value;
    const selectedKeyIngridient = document.getElementById('search-ingridient').value.toLowerCase();
  /*   const selectedKeyName = document.querySelector('.form-select').value.toLowerCase(); */

    return { selectedKeyAlckohol, selectedKeyIngridient/*,  selectedKeyName  */}

};

/* GetDrinks */
async function getDrinks(e) {
    e.preventDefault()
    const { selectedKeyAlckohol, selectedKeyIngridient/* , selectedKeyName  */} = selectedKeyValues();

    try {

        showSpinner()

        const responseByIngridients = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedKeyIngridient}`);
        const dataByIngridients = await checkStatusResponse(responseByIngridients);
        const drinksIngridients = dataByIngridients.drinks;

        const responseByAlkohol = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${selectedKeyAlckohol}`)
        const dataByAlckohol = await checkStatusResponse(responseByAlkohol);
        const drinksAlckohol = dataByAlckohol.drinks;

        const matchingDrinks = checkMatch(drinksIngridients, drinksAlckohol);

        createDrink(matchingDrinks);

        hideSpinner()

    } catch (error) {
        console.error(error);
    }

};

function checkMatch(firstElements, secondElements) {

    const matchingElements = firstElements.filter((elem) => {
        return secondElements.some((el) => el.idDrink === elem.idDrink);
    });

    return matchingElements;

}

function createDrink(data) {

    data.forEach(element => {
        const newDrink = new Drink(element);

        newDrink.renderDrink();

    })

};

/* getDrinks by ID */

async function getDrinkById(id) {

    try {

        const responseId = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const dataById = await checkStatusResponse(responseId);

        const drinkbyId = dataById.drinks;

        const newDrinkModal = new DrinkModal(drinkbyId[0]);
        newDrinkModal.renderModal();
        console.log(newDrinkModal)

    } catch (error) {

        console.error(error);

    }

};

/* class Drink and methodes render and template*/
class Drink {

    constructor({ idDrink, strDrinkThumb, strDrink }) {

        this.id = idDrink,
            this.img = strDrinkThumb,
            this.name = strDrink

    };
    templateDrink() {
        
        const drink = `
        <div class="card" style="width: 18rem;">
            <div class="card__img">
                <img class="img-fluid" src="${this.img}" alt="${this.name}">
            </div>
            <div class="card__info mt-2">
                <h3 class="card__name">${this.name}</h3>
                <div class="card__buttons">
                    <button type="button" class="modal-btn mb-2" data-bs-toggle="modal"
                    data-bs-target="#recipeModal-${this.id}">
                        <span>Watch recipe...</span>
                    </button>
                </div>
            </div>

            <div class="modal fade" id="recipeModal-${this.id}" tabindex="-1"
                aria-labelledby="recipeModalLabel-${this.id}" aria-hidden="true">
                <div class="modal-dialog modal-lg text-dark">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="recipeModalLabel-${this.id}">${this.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body"></div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        `;
        return drink;
    }


    renderDrink() {

        const content = document.querySelector(".general__content");

        const templateDrink = this.templateDrink();

        content.insertAdjacentHTML("beforeend", templateDrink);

        const button = content.querySelector(`[data-bs-target="#recipeModal-${this.id}"]`);

        button.addEventListener("click", () => {
            getDrinkById(this.id);
        });

    };

};

class DrinkModal {

    constructor({ idDrink, strDrinkThumb, strDrink, strAlcoholic, strInstructions }) {

        this.id = idDrink,
        this.img = strDrinkThumb,
        this.name = strDrink,
        this.alcoholic = strAlcoholic,
         this.instructions = strInstructions

    };

    templateModal() {

        const modal = `
        
        
            <img src="${this.img}" class="mb-3 img-fluid" style="width:300px" alt="${this.name}">
            <p>
            Alcohol:${this.alcoholic};
            </p>
            <h6>Ingredients:</h6>
            <ul>
                createIngredientsList(drink)
            </ul> 
            <p>${this.instructions}</p>
                         
        `;

        return modal;

    };

    renderModal() {
        const modal = document.getElementById(`recipeModal-${this.id}`);
        const content = modal.querySelector(".modal-body");
        content.innerHTML = "";
      
        const templateModal = this.templateModal();
      
        content.insertAdjacentHTML("afterbegin", templateModal);

    }
};

const submitBtn = document.getElementById("submit-ingridient");
submitBtn.addEventListener("click", getDrinks);

const toastLive = document.getElementById('liveToast')

if (toastLive) {
    const toastBootstrap = new bootstrap.Toast(toastLive)
    toastBootstrap.show()
}


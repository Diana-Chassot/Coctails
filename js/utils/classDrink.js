import { getDrinkById} from "./getDrinks.js";
/* class Drink and methodes render and template*/
export class Drink {

    constructor({ idDrink, strDrinkThumb, strDrink }) {

    this.id = idDrink,
    this.img = strDrinkThumb,
    this.name = strDrink

    };
    templateDrink() {

    const drink = `
        <div class="card justify-content-around" style="width: 18rem;">
            <div class="card__img">
                <img class="img-fluid" src="${this.img}" 
                alt="${this.name}" 
                data-bs-toggle="modal"
                data-bs-target="#recipeModal-${this.id}">
            </div>
            <div class="card__info mt-2">
                <h3 class="card__name">${this.name}</h3>
                <div class="card__buttons">
                    <button type="button" 
                    class="modal-btn-${this.id} btn" 
                    data-bs-toggle="modal"
                    data-bs-target="#recipeModal-${this.id}">
                    <span>Watch recipe...</span>
                    </button>
                </div>
            </div>
            <div class="modal fade" id="recipeModal-${this.id}" tabindex="-1"aria-labelledby="recipeModalLabel-${this.id}" aria-hidden="true">
                <div class="modal-dialog modal-lg text-dark">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="recipeModalLabel-${this.id}">${this.name}</h5>
                            <button 
                            type="button" 
                            class="btn-close" 
                            data-bs-dismiss="modal" 
                            aria-label="Close">
                            </button>
                        </div>
                        <div class="modal-body"></div>
                        <div class="modal-footer">
                            <button 
                            type="button" 
                            class="btn btn-secondary" 
                            data-bs-dismiss="modal">
                            Close
                            </button>
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
        
        const button = content.querySelector(`.modal-btn-${this.id}`);

        const img = content.querySelector(`[data-bs-target="#recipeModal-${this.id}"]`);

        button.addEventListener("click", () => {
        getDrinkById(this.id);
        });

        img.addEventListener("click", () => {
        getDrinkById(this.id);
        });
    };
};

export class DrinkModal {

    constructor({ idDrink, strDrinkThumb, strDrink, strInstructions },ingridientsList) {

        this.id = idDrink,
        this.img = strDrinkThumb,
        this.name = strDrink,
        this.instructions = strInstructions,
        this.ingridientsList = ingridientsList
    };

    templateModal() {

    const modal = `
        
    <img src="${this.img}" 
    class="mb-3 img-fluid" 
    style="width:300px" 
    alt="${this.name}">
    <div class="text-start">
        <h6>Ingredients:</h6>
        <ul>
        ${this.templateIngridientsList()}
        </ul> 
        <p>${this.instructions}</p>
    </div>                    
    `;

    return modal;

    };
    
    templateIngridientsList(){
    const ingredientsHtml = this.ingridientsList.map(ingredient =>`<li>${ingredient}</li>`).join('');
    
    return ingredientsHtml;
    }

    renderModal() {

    const modal = document.getElementById(`recipeModal-${this.id}`);
    const content = modal.querySelector(".modal-body");

    content.innerHTML = "";

    const templateModal = this.templateModal();

    content.insertAdjacentHTML("afterbegin", templateModal);

    }

};

export function createDrink(data) {
    data.forEach(element => {
    const newDrink = new Drink(element);
    newDrink.renderDrink();
    });
};







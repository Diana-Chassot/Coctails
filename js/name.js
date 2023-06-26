import { getDrinks} from "./utils/getDrinks.js";
import { scrollFunction } from "./utils/btnScroll.js";

window.onscroll = function () { scrollFunction() };

const btnName = document.getElementById("submit-name");
btnName.addEventListener("click", (e) =>{ 
    e.preventDefault()
    const selectedKeyNameInput = document.getElementById('search-name');
    const selectedKeyName = selectedKeyNameInput.value.toLowerCase();
    let selectedKeyAlckohol;
    let selectedKeyIngridient;

    getDrinks(selectedKeyAlckohol, selectedKeyIngridient, selectedKeyName)
});

const toastLive = document.getElementById('liveToast')
const toastBootstrap = new bootstrap.Toast(toastLive)
toastBootstrap.show()

const btnReload = document.querySelector(".btn-reload")
btnReload.addEventListener('click', () => window.location.reload());

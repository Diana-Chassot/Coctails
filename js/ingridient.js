import { getDrinks } from "./utils/getDrinks.js";
import { scrollFunction } from "./utils/btnScroll.js";

window.onscroll = function () { scrollFunction() };


const btnIngridient = document.getElementById("submit-ingridient");
btnIngridient.addEventListener("click", (e) => {
    e.preventDefault()
    const selectedKeyAlckoholInput = document.getElementById('select-alckohol');
    const selectedKeyIngridientInput = document.getElementById('search-ingridient');

    const selectedKeyIngridient = selectedKeyIngridientInput.value.toLowerCase();
    const selectedKeyAlckohol = selectedKeyAlckoholInput.value;
    let selectedKeyName;
    getDrinks(selectedKeyAlckohol, selectedKeyIngridient, selectedKeyName)
});

const toastLive = document.getElementById('liveToast')
const toastBootstrap = new bootstrap.Toast(toastLive)
toastBootstrap.show()

const btnReload = document.querySelector(".btn-reload")

if (btnReload) {
    btnReload.addEventListener('click', () => window.location.reload());
}
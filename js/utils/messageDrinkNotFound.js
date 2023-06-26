/* Message "drink not found" */
export function showMessage() {

    const message = document.querySelector(".message");
    message.style.display = "flex";

}

export function hideMessage(){
    const message = document.querySelector(".message");
    message.style.display = "none";
}
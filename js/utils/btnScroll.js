/* scroll btn */
export function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("btn-scroll-to-top").classList.add("show");
    } else {
        document.getElementById("btn-scroll-to-top").classList.remove("show");
    }
}
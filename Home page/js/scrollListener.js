const scrollToTopBtn = document.querySelector(".scrollToTopBtn");
const rootElement = document.documentElement;
let lastScrollTop = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", function(){
    const st = window.scrollY || document.documentElement.scrollTop;
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;

    if (st > lastScrollTop && rootElement.scrollTop / scrollTotal > 0.1){
        scrollToTopBtn.classList.add("showBtn");
    } else {
        scrollToTopBtn.classList.remove("showBtn");
    }

    if (st > lastScrollTop){
        header.classList.add("hideNavbar");
    } else {
        header.classList.remove("hideNavbar");
    }
    lastScrollTop = st <= 0 ? 0 : st;
}, false);

function scrollToTop() {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
scrollToTopBtn.addEventListener("click", scrollToTop);
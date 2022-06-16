var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
var rootElement = document.documentElement;
var lastScrollTop = 0;

window.addEventListener("scroll", function(){
    var st = window.scrollY || document.documentElement.scrollTop;
    var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (st > lastScrollTop && rootElement.scrollTop / scrollTotal > 0.1){
        scrollToTopBtn.classList.add("showBtn");
    } else {
        scrollToTopBtn.classList.remove("showBtn");
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
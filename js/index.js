'use strict';

/**@type {HTMLElement} */
const servicesBtn = document.querySelector(".services-btn");
/**@type {HTMLElement} */
const serviceLinks = document.querySelector(".service-links");
/**@type {HTMLElement} */
const menu = document.querySelector(".menu");
/**@type {HTMLElement} */
const mainNav = document.querySelector(".main-nav-list");
/**@type {HTMLElement} */
const root = document.querySelector(":root");
/**@type {HTMLElement} */
const goTop = document.querySelector(".go-top");
/**@type {HTMLElement} */
const navLinks = document.querySelectorAll(".nav-link");
/**@type {HTMLElement} */
const subLinks = document.querySelectorAll(".sub-link");
const desktop = matchMedia("(min-width: 60em)");

serviceLinks.classList.add("service-links-closed");
mainNav.classList.add("main-nav-list-closed");

function makeNavLinksNotSubLinksFocusable () {
    navLinks.forEach((element) => {
        if(!element.classList.contains("sub-link")) {
            element.tabIndex = 0;
        }
    });
}

function makeNavLinksUnfocusable () {
    navLinks.forEach((element) => {
        if(!menu.classList.contains("menu-active")) {
            element.tabIndex = -1;
        }
    });
}

function makeSubLinksFocusable () {
    subLinks.forEach((element) => {
        if(serviceLinks.classList.contains("service-links-opened")) {
            element.tabIndex = 0;
        }
    });
}

function makeSubLinksUnfocusable () {
    subLinks.forEach((element) => {
        if(!serviceLinks.classList.contains("service-links-opened")) {
            element.tabIndex = -1;
        }
    });
}

function closeServiceLinks () {
    if(serviceLinks.classList.contains("service-links-opened")) {
        serviceLinks.classList.remove("service-links-opened");
    }
}

function closeMenu () {
    if(mainNav.classList.contains("main-nav-list-opened")) {
        menu.classList.remove("menu-active");
        mainNav.classList.remove("main-nav-list-opened");
    }
}

function changeOnBehalfOfScreenSize() {
    if(!desktop.matches) {
        makeNavLinksUnfocusable();
        servicesBtn.tabIndex = -1;
    } else {
        makeNavLinksNotSubLinksFocusable();
        servicesBtn.tabIndex = 0;
    }
}

servicesBtn.addEventListener("click", () => {
    servicesBtn.classList.toggle("btn-on");
    serviceLinks.classList.toggle("service-links-opened");
    makeSubLinksFocusable();
    makeSubLinksUnfocusable();
});

menu.addEventListener("click", () => {
    menu.classList.toggle("menu-active");
    mainNav.classList.toggle("main-nav-list-opened");
    if(menu.classList.contains("menu-active")) {
        makeNavLinksNotSubLinksFocusable();
        servicesBtn.tabIndex = 0;
    } else {
        servicesBtn.tabIndex = -1;
    }
    closeServiceLinks();
    makeNavLinksUnfocusable();
});

navLinks.forEach((element) => {
    element.addEventListener("click", () => {
        if(menu.classList.contains("menu-active")) {
            servicesBtn.tabIndex = -1;
        }
        closeMenu();
        makeNavLinksUnfocusable();
        closeServiceLinks();
    });
});

subLinks.forEach((element) => {
    element.addEventListener("click", () => {
        if(menu.classList.contains("menu-active")) {
            servicesBtn.tabIndex = -1;
        }
        closeMenu();
        makeNavLinksUnfocusable();
        closeServiceLinks();
    });
});

goTop.addEventListener("click", () => {
    window.scrollBy({
        behavior: "smooth",
        top: root.getBoundingClientRect().top,
    });
});

changeOnBehalfOfScreenSize();

window.addEventListener("resize", changeOnBehalfOfScreenSize);

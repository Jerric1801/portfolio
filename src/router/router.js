import { home } from '../pages/home.js';
import { scrollToSection } from '../utils/scroll.js';

export function router() {
    new home();
}

//to merge with router function based on page visited
export function generateNav() {
    const navLinks = document.getElementsByClassName("nav-links");

    for (let i = 0; i < navLinks.length; i++) {
        const link = navLinks[i];

        link.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (this.hasAttribute("href")) {
                const sectionId = this.href.split("#")[1];
                scrollToSection(sectionId);
            }
        });
    }
}
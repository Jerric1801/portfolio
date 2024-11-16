import './router/router.js'

import { initializeScroll, scrollToSection } from './utils/scroll.js';

const body = document.body;
const main = document.getElementById('main');

// Initialize scroll-related functionality
initializeScroll(main);

const navLinks = document.getElementsByClassName("nav-links");

for (let i = 0; i < navLinks.length; i++) {
    const link = navLinks[i];

    link.addEventListener("click", function (event) {
        event.preventDefault(); 
        event.stopPropagation(); // Prevent event bubbling if needed

        if (this.hasAttribute("href")) {
            const sectionId = this.href.split("#")[1];
            scrollToSection(sectionId);
        }
    });
}
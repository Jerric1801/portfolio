// scroll.js

export let sx = 0, // For scroll positions
    sy = 0;
export let dx = sx, // For container positions
    dy = sy;
let isScrollingToSection = false; // Flag for section scrolling

export function initializeScroll(mainElement) {
    document.body.style.height = mainElement.clientHeight + 'px';
    mainElement.style.position = 'fixed';
    mainElement.style.top = 0;
    mainElement.style.left = 0;

    window.addEventListener('scroll', easeScroll);
    window.requestAnimationFrame(() => render(mainElement));
}

function easeScroll() {
    sx = window.scrollX;
    sy = window.scrollY;
}

function render(mainElement) {
    if (!isScrollingToSection) { // Check if section scrolling is not in progress
        dx = li(dx, sx, 0.07);
        dy = li(dy, sy, 0.08);

        dx = Math.floor(dx * 100) / 100;
        dy = Math.floor(dy * 100) / 100;

        mainElement.style.transform = `translate3d(-${dx}px, -${dy}px, 0px)`;
    } 

    window.requestAnimationFrame(() => render(mainElement));
}

function li(a, b, n) {
    return (1 - n) * a + n * b;
}

export function scrollToSection(sectionId) {
    const sectionElement = document.getElementById(sectionId);

    if (sectionElement) {
        const sectionRect = sectionElement.getBoundingClientRect();
        const targetScrollX = window.scrollX + sectionRect.left;
        const targetScrollY = window.scrollY + sectionRect.top;

        window.scrollTo({
            top: targetScrollY,
            left: targetScrollX,
            behavior: 'smooth',
        });
    } else {
        console.error("Section not found:", sectionId);
    }
}
const body = document.body;
const main = document.getElementById('main');

let sx = 0, // For scroll positions
    sy = 0;
let dx = sx, // For container positions
    dy = sy;
let isScrollingToSection = false; // Flag for section scrolling

body.style.height = main.clientHeight + 'px';
main.style.position = 'fixed';
main.style.top = 0;
main.style.left = 0;

window.addEventListener('scroll', easeScroll);

function easeScroll() {
  sx = window.scrollX;
  sy = window.scrollY;
}

window.requestAnimationFrame(render);

function render() {
  if (!isScrollingToSection) { // Check if section scrolling is not in progress
    dx = li(dx, sx, 0.07);
    dy = li(dy, sy, 0.08);

    dx = Math.floor(dx * 100) / 100;
    dy = Math.floor(dy * 100) / 100;

    main.style.transform = `translate3d(-${dx}px, -${dy}px, 0px)`;
  } 

  window.requestAnimationFrame(render);
}

function li(a, b, n) {
  return (1 - n) * a + n * b;
}
function scroll_to_section(sectionId) {
  const sectionElement = document.getElementById(sectionId);

  if (sectionElement) {
      const sectionRect = sectionElement.getBoundingClientRect();
      const targetScrollX = window.scrollX + sectionRect.left;
      const targetScrollY = window.scrollY + sectionRect.top; 

      window.scrollTo({
          top: targetScrollY,
          left: targetScrollX,
          behavior: 'smooth'
      });
  } else {
      console.error("Section not found:", sectionId);
  }
}

const navLinks = document.getElementsByClassName("nav-links");

for (let i = 0; i < navLinks.length; i++) {
  const link = navLinks[i];

  link.addEventListener("click", function (event) {
      event.preventDefault(); 
      event.stopPropagation(); // Prevent event bubbling if needed

      if (this.hasAttribute("href")) {
          const sectionId = this.href.split("#")[1]; 
          scroll_to_section(sectionId);
      }
  });
}
import { disable_scrolling } from '../utils/utils.js';

export const projects = {}

export function build_project(projectName) {
    const selected = projects[projectName]
    const popup =  document.getElementById("works-popup");
    const contentContainer = document.getElementById("popup-content");
    const content = selected.get_content()
    contentContainer.innerHTML = ""
    contentContainer.append(content)
    popup.style.display = "flex"
    disable_scrolling()
}

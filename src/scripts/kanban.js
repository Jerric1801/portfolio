import { build_project } from "./projects.js";

function calculateIntersectionArea(rect1, rect2) {
    const xOverlap = Math.max(0, Math.min(rect1.left + rect1.width, rect2.left + rect2.width) - Math.max(rect1.left, rect2.left));
    const yOverlap = Math.max(0, Math.min(rect1.top + rect1.height, rect2.top + rect2.height) - Math.max(rect1.top, rect2.top));
    const overlapArea = xOverlap * yOverlap;
    return overlapArea;
}

function hasClassInArray(item, classArray) {
    // Use the classList property to access an item's classes
    for (const className of item.classList) {
        if (classArray.includes(className)) {
            return true;
        }
    }
    return false;
}


class kanban {
    big_widgets = ["map-widget", "stock-widget"];

    constructor() {
        this.draggables = $(".draggable"); 
        this.bind_click(); 
    }

    bind_click() {
        this.draggables.each((index, item) => {
            //binds only small widgets
            if (!hasClassInArray(item, this.big_widgets)) {
                $(item).on("click", function () {
                    let project = $(this).attr("data-project");
                    build_project(project);
                });

                // You can keep the mouseover/mouseout for the cursor if needed
                $(item).on("mouseover", function () {
                    $(this).addClass('find-out-cursor');
                });

                $(item).on("mouseout", function () {
                    $(this).removeClass('find-out-cursor');
                });
            }
        });
    }
}

$(window).on("load", function () {
    new kanban();
});
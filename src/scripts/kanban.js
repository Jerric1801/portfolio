// use jquery for this class
function calculateIntersectionArea(rect1, rect2) {
    const xOverlap = Math.max(0, Math.min(rect1.left + rect1.width, rect2.left + rect2.width) - Math.max(rect1.left, rect2.left));
    const yOverlap = Math.max(0, Math.min(rect1.top + rect1.height, rect2.top + rect2.height) - Math.max(rect1.top, rect2.top));
    const overlapArea = xOverlap * yOverlap;
    return overlapArea;
}

class kanban {

    position = null

    constructor() {
        this.draggables = $(".draggable")
        this.board = $("#work-kanban")
        this.init_drop()
        this.init_drag()
    }
    init_drop() {
        this.board.droppable()
    }
    init_drag() {
        this.draggables.each((index, drag_item)=>{
            this.apply_drag(drag_item);
            this.bind_popup(drag_item)
        })
    }
    bind_popup(item) {
        const backButton = $("#popup-back")
        const popup = $("#works-popup")

        $(item).on("click", function(){
            popup.css("display", "flex")
        })

        backButton.on("click", function() {
            popup.css("display", "none")
        })
    }
    apply_drag(drag_item) {
        $(drag_item).draggable({
            cursor: "move",
            revert: "valid",
            containment: "#work-kanban",
            start: (event, ui) =>  {
            },
            drag: (event, ui)=> {
                $(drag_item).css("z-index", 9999)
                this.position = $(drag_item).offset()
            },
            stop : (event, ui) => {
                $(drag_item).css("z-index", 1)
                const mostIntersected = this.calculate_intersection($(drag_item))
                const dragIndex = this.board.index($(drag_item))
                const intersectIndex = this.board.index(mostIntersected)
                console.log(dragIndex)
                if (mostIntersected && this.valid_drop(dragIndex, intersectIndex)) {
                    $(drag_item).insertBefore(mostIntersected); // Insert directly after
                } else {
                    this.board.append($(drag_item)); // Fallback to append if no intersection
                }
            }
        }
        )
    }
    calculate_intersection(drag_item) {
        let mostIntersected = null;
        let maxIntersectionArea = 0;

        const position = this.position

        const draggedRect = { // Get dimensions of the dragged item
            top: position.top,
            left: position.left,
            width: $(drag_item).width(),
            height: $(drag_item).height()
        };

        this.draggables.each((index, otherDragItem) => {
            if ($(drag_item).attr('class') !== $(otherDragItem).attr('class')) { 
                const otherPosition = $(otherDragItem).offset(); 
                const otherRect = {
                    top: otherPosition.top,
                    left: otherPosition.left,
                    width: $(otherDragItem).width(),
                    height: $(otherDragItem).height()
                };

                const intersectionArea = calculateIntersectionArea(draggedRect, otherRect);

                if (intersectionArea > maxIntersectionArea) {
                    maxIntersectionArea = intersectionArea;
                    mostIntersected = otherDragItem;
                }
            }
        })
        return mostIntersected;
    }
    valid_drop(dragIndex, intersectIndex){
        const big_widgets = ["map-widget", "stock-widget"]
        //SPLIT BY ROWS, IF THE RESULTING POSITIONS HAVE 2 BIG WIDGETS IN ONE HALF - THAT ARE NOT 01 OR 56, DISALLOW
        // if (big_widgets.includes())
        console.log(dragIndex)
        return true
    }
}

$(window).on("load", function() {
    new kanban()
})

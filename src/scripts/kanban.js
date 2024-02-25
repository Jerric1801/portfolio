// use jquery for this class

class kanban {
    constructor() {
        this.droppables = $("#work-kanban")
        this.draggables = $(".draggable")

        this.init_drop()
        this.init_drag()
    }
    init_drop() {
        this.droppables.sortable({
            start: function(e, ui){
                ui.placeholder.height(ui.item.height());
            },
            sort: function(event, ui) {
                const rowHeight = 250; // Your fixed row height
                const gapSize = 50; // The gap between rows
                const maxRows = 2; 
            
                // Calculate the placeholder's target row
                const placeholderRow = Math.floor((ui.placeholder.offset().top - gapSize) / (rowHeight + gapSize));
            
                // Placeholder constraint and top position adjustment
                if (placeholderRow >= maxRows) { 
                    // Calculate position to stay within bounds of the last row
                    const maxAllowedTop = (maxRows - 1) * (rowHeight + gapSize) + gapSize; 
                    ui.placeholder.css('top', maxAllowedTop); 
                } else {
                    // Dynamically update for rows above the limit 
                    ui.placeholder.css('top', ui.placeholder.offset().top); 
                }
            }
        }
        );
        this.droppables.disableSelection();
    }
    init_drag() {
        this.draggables.each((index, drag_item)=>{
            $(drag_item).draggable({
                revert: "valid",
                containment: "#work-kanban"
            })
        })
    }
}

$(window).on("load", function() {
    new kanban()
})
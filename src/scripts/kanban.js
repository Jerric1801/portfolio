// use jquery for this class

class kanban {
    constructor() {
        this.draggables = $(".draggable")

        this.init_drop()
        this.init_drag()
    }
    init_drop() {
        $("#work-kanban").droppable({

        })
    }
    init_drag() {
        this.draggables.each((index, drag_item)=>{
            $(drag_item).draggable({
                zIndex: 9999,
                revert: "valid",
                containment: "#work-kanban",
                connectWith: "#work-kanban" // Link with the sortable
            })
        })
    }
}

$(window).on("load", function() {
    new kanban()
})


// init_drop() {
//     const kanban_top = $("#work-kanban").offset().top
//     const height = 250 * 2 + 50;
//     this.droppables.sortable({
//         sort: function(event, ui) {
//             const rowHeight = 250; 
//             const maxRows = 2; 
//             const currentHeight = $("#work-kanban").height()
        
//             const placeholderRow = Math.floor((currentHeight) / (rowHeight));

//             console.log(placeholderRow)
//             if (placeholderRow > maxRows) {
//                 const row_one = []
//                 const row_two = []
//                 const elements_to_restore = [];

//                 $("#work-kanban").children().each(function(){
//                     let element_top = $(this).offset().top
//                     let difference = element_top - kanban_top;
//                     if (difference > -height) {
//                         elements_to_restore.push($(this))
//                     }
//                     else if (difference > -height/2 && difference < -height) {
//                         row_two.push($(this))
//                     }
//                     else {
//                         row_one.push($(this))
//                     }
                    
//                 })
//                 $(elements_to_restore).each(function() {
//                     let element_width = $(this).width;
//                     //check first row
//                     let sum_width = 0;
//                     $(row_one).each(function() {
//                         sum_width += element_width
//                     })

//                     let actual_width = $("#work-kanban").width() - 250;
//                     if (sum_width < actual_width){
//                         $(this).insertAfter(`#work-kanban:nth-child(${row_one.length})`)
//                     }

//                     // sum_width = 0;
//                     // $(row_two).each(function() {
//                     //     sum_width += element_width
//                     // })

//                     // if (sum_width < actual_width){
//                     //     $(this).insertAfter(`#work-kanban:nth-child(${row_two.length})`)
//                     // }


//                 })

//             } 
//         }
//     }
//     );
//     this.droppables.disableSelection();
// }
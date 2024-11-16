import { build_project } from "../projects/projects.js";
import {hasClassInArray} from "../utils/utils.js"
import {mapWidget} from '../widgets/home/map.js';
import {stockWidget} from '../widgets/home/stocks.js';

export class home {
    big_widgets = ["map-widget", "stock-widget"];

    constructor() {
        this.draggables = $(".draggable"); 
        this.bind_click(); 
        this.init_widgets();
    }
    init_widgets() {
        new mapWidget();
        new stockWidget();
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

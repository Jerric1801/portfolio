import { build_project } from "../projects/widgets.js";
import {hasClassInArray} from "../utils/utils.js"
import {mapWidget} from '../widgets/home/map.js';
import {stockWidget} from '../widgets/home/stocks.js';
import { enable_scrolling } from '../utils/utils.js';
import { project_mapper } from "../projects/data/project_list.js";
import {Project} from "../projects/projects.js"
import {projects} from "../projects/widgets.js"

export class home {
    big_widgets = ["map-widget", "stock-widget"];

    constructor() {
        this.draggables = $(".draggable"); 
        this.bind_click(); 
        this.init_projects();
        this.init_widgets();
    }
    init_projects() {
        const popup =  document.getElementById("works-popup");
        const backButton = document.getElementById("popup-back");
        backButton.addEventListener("click", () => {
            popup.style.display = "none"
            enable_scrolling()
        })
        
        for (const key in project_mapper){
            const project_info = project_mapper[key]
            projects[key] = new Project(project_info["name"], key, project_info["sections"])
        }
        
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

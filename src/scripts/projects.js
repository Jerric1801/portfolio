class Project {
    name;
    image_path = "./static/images/";
    images;
    desc;
    popup = document.getElementById("works-popup")
    content = document.getElementById("popup-content");
    backButton = document.getElementById("popup-back");

    constructor(name, path, images, desc) {
        this.name = name;
        this.image_path += path;
        this.images = images;
        this.desc = desc;

        //clear popup
        this.content.innerHTML = ""
        this.content.style.overflow = "scroll"

        this.popup.style.display = "flex"

        this.bind_back_button()
        this.disableScrolling()
        this.create_title()
        this.create_layout()
    }
    bind_back_button() {
        this.backButton.addEventListener("click", () => {
            this.popup.style.display = "none"
            this.enableScrolling()
        })
    }
    disableScrolling() {
        const popupRect = document.getElementById("works-popup").getBoundingClientRect();
        const targetScrollX = window.scrollX + popupRect.left;
        const targetScrollY = window.scrollY + popupRect.top; 
    
        // Smooth scrolling option
        window.scrollTo({
            top: targetScrollY,
            left: targetScrollX,
            behavior: 'smooth'
        });
        document.body.classList.add('no-scroll');
    }
    enableScrolling() {
        document.body.classList.remove('no-scroll');
    }
    create_title() {
        let titleCon = document.createElement("div")
        titleCon.className = "popup-title-container"
        let text = document.createElement("h1")
        text.textContent = this.name
        titleCon.append(text)

        this.content.append(titleCon)
    }
    create_image(src, type= 0) {
        let image = document.createElement("img")
        image.src = this.image_path + "/" + src

        return image
    }
    create_description(content, type=0) {
        let descCon = document.createElement("div")
        let text = document.createElement("p")
        text.textContent = content
        descCon.append(text)

        return descCon
    }
    create_layout() {
        const description = this.desc
        const images = this.images
        images.map((image, i) => {
            var desc = description[i]
            let projectCon = document.createElement("div")
            projectCon.className = "popup-project-container"
            let imageItem = this.create_image(image)
            let descItem = this.create_description(desc)

            projectCon.append(imageItem)
            projectCon.append(descItem)

            this.content.append(projectCon)
        })
    }
}

const project_mapper = 
{"mapping_buddy": {
    "name": "Mapping Buddy",
    "image": ["overview.png", "CU.png", "showcase.png"],
    "desc": ["this is the overview", "hello", "hello"]
},
"birthin": {
    "name": "birthin co.",
},
"mood": {
    "name": "mood",
},
"gis": {
    "name": "Derna Deluge Dorsier",
},
"unblock": {
    "name": "Unblock",
},
"xrperience": {
    "name": "XRperience",
},
"cmc": {
    "name": "CMC"
},
"cmpn": {
    "name": "Companion"
}
}


export function build_project(attr) {
    try{
        let project_info = project_mapper[attr]
        new Project(project_info["name"], attr, project_info["image"], project_info["desc"])

    }
    catch {
        console.log("Error in project.js")
    }
}

$(window).on("load", function() {
    document.getElementById("#popup-content")
})

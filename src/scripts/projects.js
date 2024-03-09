class Project {
    name;
    image_path = "./static/images/";
    popup = document.getElementById("works-popup")
    content = document.getElementById("popup-content");
    backButton = document.getElementById("popup-back");

    constructor(name, path, sections) {
        this.name = name;
        this.image_path += path;

        //clear popup
        this.content.innerHTML = ""
        this.content.style.overflow = "scroll"

        this.popup.style.display = "flex"

        this.bind_back_button()
        this.disableScrolling()
        // this.create_title()
        for (const key in sections) {
            const value = sections[key]
            this.section_router(value, key)
        }
    }
    section_router(value, key) {
        if (key == "intro"){
            this.create_intro(value)
        }
        else if (key == "layout_1") {
            this.create_default(value, "popup-default-1")
        }
        else if (key == "layout_2") {
            this.create_default(value, "popup-default-2")
        }
        else if (key == "layout_3") {
            this.create_default(value, "popup-default-3")
        }
        else if (key == "gallery_1") {
            this.create_gallery(value, "popup-gallery-3")
        }
        else if (key == "gallery_2") {
            this.create_gallery(value, "popup-gallery-5")
        }
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
    create_image(src) {
        let image = document.createElement("img")
        image.src = this.image_path + "/" + src

        return image
    }
    create_description(content, className = "") {
        let descCon = document.createElement("div")
        descCon.className = className + " popup-description"
        let text = document.createElement("p")
        text.textContent = content
        descCon.append(text)

        return descCon
    }
    create_intro(value) {
        const [logo, old_description] = value
        const description = old_description.split(" * ")
        let introCon = document.createElement("div")
        let imageItem = this.create_image(logo)
        let projectType = this.create_description(description[0], "center bold")
        let skillsUsed = this.create_description(description[1], "center bold")
        let descItem = this.create_description(description[2],  "center")
        introCon.className = "popup-project-intro popup-default"
        
        introCon.append(imageItem)
        introCon.append(projectType)
        introCon.append(skillsUsed)
        introCon.append(descItem)

        this.content.append(introCon)
    }
    create_default(value, className) {
        const [image, description] = value
        let projectCon = document.createElement("div")
        projectCon.className = "popup-default" + " " + className
        let imageItem = this.create_image(image)
        let descItem = this.create_description(description)

        projectCon.append(imageItem)
        projectCon.append(descItem)

        this.content.append(projectCon)
    }
}

const project_mapper = 
{"mapping_buddy": {
    "name": "Mapping Buddy",
    "sections": {
        "intro": ["mapping_buddy.png", "SMU Module IS201 Interaction Design Prototyping * HTML, CSS, Javascript, Jquery UI * Frustrated with unintuitive tools and scattered information, SMU students struggle to effectively plan their modules. My team designed Mapping Buddy, a web application that simplifies course sequence planning. It offers a streamlined user experience, potentially saving students countless hours of hassle" ],
        "layout_1": ["overview.png", "" ]
    }
},
"birthin": {
    "name": "birthin co.",
    "sections": {
        "intro": ["birthin.png", "SMU Module IS201 Interaction Design Prototyping * HTML, CSS, Javascript * Mapping Buddy is a project that was done in school" ],
    }
},
"mood": {
    "name": "mood",
    "sections": {
        "intro": ["mood_logo.png", "SMU Module IS113 Sensors and IOT<br>HTML, CSS, Javascript * Mapping Buddy is a project that was done in school" ],
    }
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
        new Project(project_info["name"], attr, project_info["sections"])

    }
    catch {
        console.log("Error in project.js")
    }
}

$(window).on("load", function() {
    document.getElementById("#popup-content")
})

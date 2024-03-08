class Project {
    name;
    image_path = "./static/images/";
    images;
    desc;
    content = document.getElementById("popup-content");
    constructor(name, path, images, desc) {
        this.name = name;
        this.image_path += path;
        this.images = images;
        this.desc = desc;
        console.log(this.desc)

        //clear popup
        this.content.innerHTML = ""
        this.content.style.overflow = "scroll"

        this.create_title()
        this.create_layout()
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
}
}


export function build_project(attr) {
    try{
        let project_info = project_mapper[attr]
        new Project(project_info["name"], attr, project_info["image"], project_info["desc"])

    }
    catch {
        console.log("project does not exist")
    }
}

$(window).on("load", function() {
    document.getElementById("#popup-content")
})

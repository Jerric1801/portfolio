export class Project {
    name;
    image_path = "./static/images/";
    popup = document.getElementById("works-popup")
    content = document.createElement("div")
    sections;

    constructor(name, path, sections) {
        this.name = name;
        this.image_path += path;
        this.sections = sections
        //clear popup
        for (const key in this.sections) {
            const value = this.sections[key]
            let layout = value[0]
            this.section_router(value.slice(1), layout)
        }
    }
    get_name() {
        return this.name
    }
    get_content() {
        return this.content
    }
    section_router(value, key) {
        if (key == "intro"){
            this.create_intro(value)
        }
        else if (key == "title") {
            this.create_title()
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
        else if (key == "link_box") {
            this.create_link(value)
        }
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
    create_video(src) {
        let image = document.createElement("video")
        image.src = this.image_path + "/" + src
        image.autoplay = true
        image.loop = true
        image.muted = true

        return image
    }
    create_link(href) {
        let linkCon = document.createElement("div")
        linkCon.className = "popup-link"
        let text = document.createElement('p')
        let link = document.createElement('a')
        link.href = href[1]
        link.target = "_blank"
        link.textContent = href[1]
        text.textContent = href[0] + `: `
        text.append(link)
        linkCon.append(text)
        this.content.append(linkCon)
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
        if (image.endsWith(".mp4")){
            imageItem = this.create_video(image)
        }
        let descItem = this.create_description(description)

        projectCon.append(imageItem)
        projectCon.append(descItem)
        this.content.append(projectCon)
    }

}




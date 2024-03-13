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
        for (const key in sections) {
            const value = sections[key]
            let layout = value.shift()
            this.section_router(value, layout)
        }
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
        let link = document.createElement('a')
        link.href = href[0]
        link.target = "_blank"
        link.textContent = "Click Here to find out more!"
        linkCon.append(link)
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

const project_mapper = 
{"mapping_buddy": {
    "name": "Mapping Buddy",
    "sections": {
        "1": ["intro", "mapping_buddy.png", "Year 2 SMU Module IS211 Interaction Design Prototyping * HTML | CSS | Javascript | Jquery UI * Frustrated with unintuitive tools and scattered information, SMU students struggle to effectively plan their modules. My team designed Mapping Buddy, a web application that simplifies course sequence planning. It offers a streamlined user experience, potentially saving students countless hours of hassle" ],
        "2": ["layout_1","overview.png"], 
        "3": ["layout_2","CU.png" , "We were initially tasked with creating Figma designs, but we recognized the potential to enhance the prototype's functionality and user experience. We incorporated jQuery UI to implement a dynamic Kanban board, a key component of the design. Despite the technical complexity and a tight 3-4 week deadline, we successfully delivered a more interactive and realistic prototype. This prototype included functionality such as a CU tracker, tabs and module search"],
        "link_box": "https://mappingbuddy.netlify.app/"
    }
},
"birthin": {
    "name": "birthin co.",
    "sections": {
        "1": ["intro","birthin.png", "Passion Project * Entrepreneurship | Branding | Web Design * Artisanal Elevation. A focus on branding, web design & development, and all things else in helping you build your online presence. \n Birthin Co. was created to craft unique identities that make businesses stand out. As a Web Designer and Developer for this budding start-up, my aim is to be an artisan in the competitive world of B2B. I strive to create fully customizable pages that are built from scratch, to create functionality and personality in each project." ],
        "2": ["layout_1","birthin_mockup.png"], 
        "link_box": ["link_box","https://birthin.co/"]
    }
},
"mood": {
    "name": "mood",
    "sections": {
        "1": ["intro","mood_logo.png", "Year 1 SMU Module IS113 Sensors and IOT * React Native | Flask | Expo | MongoDB * Mood is a mobile application that was developed to help students with their mental health. A user-centric experience with integrated personalisation was created to deliver timely reminders and incentives for self-care and stress management." ],
        "2": ["layout_3","landing_page.png", "We understand how easy it is to get lost in work or studies, spending long stretches hunched over a screen. But staying sedentary for too long can take a toll on our well-being.  Wanting to find a way to address this, we decided to harness the technology we all carry – our smartphones. Using the phone's built-in sensors (like the accelerometer and gyroscope), we designed a system that could detect prolonged inactivity.  The app then prompts the user with gentle reminders to take breaks and offers simple activities to promote movement and mindfulness."]
    }
},
"gis": {
    "name": "Derna Deluge Dorsier",
    "sections": {
        "1": ["intro","gis_logo.png", "Year 2 SMU Module SMT201 Geographical Information Systems * QGIS | Python | Google Maps API * Addressing the urgent need for disaster mitigation, this project demonstrates how GIS and remote sensing can revolutionize urban flood response. We aim to provide tools for accurate loss assessment and streamlined recovery planning, ultimately protecting lives and livelihoods."],
        "2": ["layout_1","building_use.png"],
        "3": ["layout_2","comparison.png", "We used a combination of OBIA, building classification techniques, and network analysis to pinpoint most severely affected areas and quantify building damage caused by the flood." ],
        "4": ["link_box","https://smt201-g2-2023.netlify.app/"]
    }
},
"unblock": {
    "name": "Unblock",
    "sections": {
        "1": ["intro","unblock_logo.png", "PSA CodeSprint Hackathon Oct 2023 * Blockchain | Flask | Machine Learning * Our solution is marketed as a tool that employs models to make the berthing process more efficient and blockchain technology to make the process visible to all stakeholders. Our solution can be used by all stakeholders to make informed decisions for shipping to reduce congestion, prevent waste of resources and lower costs."],
        "2": ["layout_1","homepage.png"],
        "3": ["layout_2","blockchain.png", "How it works: Our solution utilises blockchain technology to share data which was used to train a seasonal AI model to forecast port availability in the future. Next, companies can enter details for their shipment. Our model will then provide recommendations on which ports are best suited to your needs (table below shows an example of how blockchains are stored)"],
        "link_box": "https://www.youtube.com/watch?v=bUcWCzstblc"
    }
},
"xrperience": {
    "name": "XRperience",
    "sections": {
        "1": ["intro","ar_chat.png", "DSTA Brainhack Hackathon XRperience June 2023 * Unity | C# | Blender | OpenAI api | ElevenLabs api * Developed an innovative mobile AR application using Unity, GPT3.5, Whisper API, and ElevenLabs API to enhance youth engagement with Singapore's Heritage Sites" ],
        "2": ["layout_1","functionality.png"],
        "3": ["layout_2","works.png", "How it works: The user can record a prompt to ask the Heritage Mascot. In this case we used Sang Nila Utama as our mascot. We then utilise Open AI Whisper api to convert the speech to text. After conversion, we engineer the prompt and pass the text into the GPT3.5 api. The response is then sent to ElevenLabs api to convert it back to speech."],
        "4": ["layout_3","demo.mp4"]
    }
},
"cmc": {
    "name": "Capital Markets in China",
    "sections": {
        // "title": "",
        "1": ["intro","cmc_web.png", "Year 2 SMU Module Capital Markets in China * Machine Learning (GBR) | China Stock Market * We were tasked to analyze the financial characteristics of listed companies in the Shanghai and Shenzhen stock exchanges, presenting patterns in profitability, financial structure, operating efficiency, and market measures, potentially broken down by industry, ownership, region, and exchange."],
        "2": ["layout_1","private_soe.png"],
        "3": [ "layout_2", "variables.png", "My Group set out to identify the financial and operational factors that most accurately predict profitability for Chinese listed companies using Gradient Boosting Regression. We utilized sklearn’s Gradient Boosting Regression Model (GBM) which fits a regression tree on the negative gradient of a given function. This additive model gradually tailors to the problem through optimizing the loss function. Although there are a variety of effective models to train the data, we decided to use GBM due to its robustness to overfitting data and performance in training stock price data"],
        "4": [ "layout_2","Shenzhen_shanghai.png", "Our distinct predictive models showed that profitability measures such as ROA and ROE are generally effective variables. ROE and ROA emerged as the two most important metrics, at first and second place respectively. They offer insights into a company's profitability relative to shareholder investment, making them particularly relevant for Chinese listed companies, be it private or state-owned. Other interesting features that scored well in feature importance, such as total leverage, provided a nuanced understanding of a company's risk profile, an essential consideration in China's dynamic economic landscape. The model also enabled us to identify features that were not as indicative of profitability and performance. These features, notably working capital turnover ratio, capital intensity, and book to market ratio, while offering interesting insights into the operational structure of the firms, were not as reliable as a metric for predicting profitability. (Screenshot shows a web app created to present our findings)"]
    }
},
"cmpn": {
    "name": "Companion",
    "sections": {
        "1": ["intro","cmpn_logo.png", "Passion Project * Flask | mySQL | Jinjja | TigerTrade API | Trading View * Companion is a personal project that I have built to help me better manage my own finances. " ],
        "2": ["layout_1","dashboard.png"],
        "3": ["layout_2","", "Using my brokerage, Tiger Trade API, I called my stock"],
    }
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

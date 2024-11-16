import {build_project} from "../../projects/projects.js";

export class mapWidget {
    //canvas settings
    water_color = "#2A3B49"
    canvas_width = 1000;
    canvas_height = 500;
    x_origin = 0;
    y_origin = 0;

    //grid settings
    long_gap = 10;
    min_longitude = -180;
    max_longtitude = 180;

    lat_gap = 10
    min_latitude = -90;
    max_latitude = 90;

    //movement settings
    offsetX = 0;
    offsetY = 0 ;
    movementSpeed = 5;     
    isMoving = false;
    movementDirection;

    //pins 
    pins = [[540, 125],[774,210]]

    constructor() {
        this.canvas = document.getElementById('map')
        this.buttons = document.getElementsByClassName("map-button")

        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d')
        }
        this.build()

    }
    init_buttons() {
        for (let index = 0; index < 4; index++) {
            let button = this.buttons[index]
            this.movementDirection = button.getAttribute('data-direction');

            let mapWidth = 500
            let mapHeight = 250
            if (this.movementDirection == "left") {
                button.style.marginLeft = `-${mapWidth - 25}px`
            }
            else if (this.movementDirection == "right") {
                button.style.marginLeft = `${mapWidth - 25}px`
            }
            else if (this.movementDirection == "up") {
                button.style.marginTop = `-${mapHeight - 65}px`
            }
            else if (this.movementDirection == "down") {
                button.style.marginTop = `${mapHeight - 50}px`
            }

            button.addEventListener('mousedown', () => {
                this.isMoving = true;
                this.movementDirection = button.getAttribute('data-direction');
                this.startMovement();
            });

            button.addEventListener('mouseup', () => {
                this.isMoving = false;
            });
        }
    }
    updateMapPosition() {

        const mapBoundary = 500; 

        // Adjust offsetX for boundaries
        if (this.offsetX > mapBoundary) {
            this.offsetX = mapBoundary;
            this.isMoving = false;
        } else if (this.offsetX < -mapBoundary) {
            this.offsetX = -mapBoundary;
            this.isMoving = false;
        }

        // Adjust offsetY for boundaries
        if (this.offsetY > mapBoundary / 2) {
            this.offsetY = mapBoundary / 2;
            this.isMoving = false;
        } else if (this.offsetY < -mapBoundary / 2) {
            this.offsetY = -mapBoundary / 2;
            this.isMoving = false;
        }

        this.canvas.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
    }
    startMovement() {
        if (!this.isMoving) return;  

        switch (this.movementDirection) {
            case 'left':
                this.offsetX += this.movementSpeed;
                break;
            case 'right':
                this.offsetX -= this.movementSpeed; // Move right
                break;
            case 'up':
                this.offsetY += this.movementSpeed; // Move up
                break;
            case 'down':
                this.offsetY -= this.movementSpeed; // Move down
                break;
        }


        this.updateMapPosition(document.getElementById('map'));
        requestAnimationFrame(this.startMovement.bind(this)); // Schedule next update
    }

    draw_map_background() {
        this.ctx.fillStyle = this.water_color;
        this.ctx.fillRect(this.x_origin, this.y_origin, (this.x_origin + this.canvas_width), this.y_origin + this.canvas_height)
        this.ctx.stroke()
    }

    draw_shapes() {
        return new Promise((resolve, reject) => {
            var jsonpath = "../../static/json/output.json"
    
            fetch(jsonpath)
                .then(response => response.json())
                .then(data => {
                    for (let continent in data) {
                        let coords = data[continent]
                        this.ctx.beginPath();
                        this.ctx.moveTo(coords[0][0], coords[0][1]);
                        coords.slice(1).forEach(point => {
                            this.ctx.lineTo(point[0], point[1]);
                        });
                        this.ctx.closePath();
                        this.ctx.stroke();
                        this.ctx.fillStyle = '#f3f3f3';
                        this.ctx.fill();
                    }
                    resolve(); // Resolve the promise once shapes are drawn
                })
                .catch(error => {
                    console.error('Error fetching JSON:', error);
                    reject(error); // Reject the promise if an error occurs
                });
        });
    }
    create_pin(coords) {
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, coords[0], coords[1], 40, 40);
            this.ctx.globalCompositeOperation = 'source-over';
        }
        image.src = "../../static/images/location.svg";
    }

    add_listeners() {
        this.canvas.addEventListener('click', (event) => {
            const mouseX = event.offsetX
            const mouseY = event.offsetY;
            // Assuming pins are stored in an array
            for (let index in this.pins) {
                const pin = this.pins[index]
                const hitRadius = 60; // Adjust for desired click sensitivity
                const distance = Math.sqrt(Math.pow(pin[0] - mouseX, 2) + Math.pow(pin[1] - mouseY, 2));

                if (distance <= hitRadius) {
                    if(index == 0){
                        build_project("gis")
                    }
                    else {
                        build_project("unblock")
                    }
                    break; 
                }
            }
        });
    }

    build() {
        this.init_buttons()
        this.draw_map_background()
        this.draw_shapes().then(() => {
            for (const pin of this.pins){
                this.create_pin(pin)
                this.create_pin(pin)
            }
            this.add_listeners()
        });
    }
}


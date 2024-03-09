

class MapWidget {
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

    offsetX;
    offsetY;
    movementSpeed = 5;      // Smaller movement per update
    isMoving = false; 

    constructor(){
        this.canvas = document.getElementById('map')
        this.buttons = document.getElementsByClassName("map-button")

        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d')
        }
        this.build()
        this.offsetX = 0;  // Initialize offsets
        this.offsetY = 0;
        this.init_buttons()
    }
    init_buttons() {
        for (let index = 0 ; index < 4; index ++) {
            let button = this.buttons[index]
            let content = button.textContent
            let direction = content.trim()
            let mapWidth = 500
            let mapHeight = 250
            if (direction == "<"){
                button.style.marginLeft= `-${mapWidth -25}px`
            }
            else if (direction == ">"){
                button.style.marginLeft= `${mapWidth- 25}px`
            }
            else if (direction == "^"){
                button.style.marginTop= `-${mapHeight - 65}px`
            }
            else {
                button.style.marginTop= `${mapHeight - 50}px`
            }

            //smooth animation
            button.addEventListener('mousedown', () => { 
                this.isMoving = true;   // Start movement on 'mousedown'
                this.movementDirection = direction; 
                this.startMovement();
            });

            button.addEventListener('mouseup', () => { 
                this.isMoving = false;  // Stop movement on 'mouseup'
            });
            }
    }
    draw_map_background() {
        this.ctx.fillStyle = this.water_color;
        this.ctx.fillRect(this.x_origin, this.y_origin, (this.x_origin + this.canvas_width), this.y_origin + this.canvas_height)
        this.ctx.stroke()
    }

    draw_shapes() {
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
                this.ctx.fillStyle = '#f3f3f3'; // Set fill color with alpha (e.g., semi-transparent red)
                this.ctx.fill(); // Fill the shape
            
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
    }

    build() {
        this.draw_map_background()
        this.draw_shapes()
    }
    updateMapPosition() {        

        const mapBoundary = 500; // Distance from origin

        // Adjust offsetX for boundaries
        if (this.offsetX > mapBoundary) {
            this.offsetX = mapBoundary;
            this.isMoving = false; 
        } else if (this.offsetX < -mapBoundary) {
            this.offsetX = -mapBoundary;
            this.isMoving = false; 
        }
        
        // Adjust offsetY for boundaries
        if (this.offsetY > mapBoundary) {
            this.offsetY = mapBoundary;
            this.isMoving = false; 
        } else if (this.offsetY < -mapBoundary) {
            this.offsetY = -mapBoundary;
            this.isMoving = false; 
        }

        this.canvas.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
    }
    startMovement() {
    if (!this.isMoving) return;  // Don't start if already moving

    switch (this.movementDirection) {
        case '<':
            this.offsetX += this.movementSpeed; 
            break;
        case '>':
            this.offsetX -= this.movementSpeed; // Move right
            break;
        case '^':
            this.offsetY += this.movementSpeed; // Move up
            break;
        case '⤓':
            this.offsetY -= this.movementSpeed; // Move down
            break;
        }

    
    this.updateMapPosition(document.getElementById('map')); 
    requestAnimationFrame(this.startMovement.bind(this)); // Schedule next update
}
    
}

window.addEventListener("load", function() {
    new MapWidget()
})


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

    constructor(){
        this.canvas = document.getElementById('map')
        this.buttons = document.getElementsByClassName("map-button")

        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d')
        }
        this.build()
        this.init_buttons()
    }
    init_buttons() {
        for (let index = 0 ; index < 4; index ++) {
            var button = this.buttons[index]
            var content = button.textContent
            var direction = content.trim()
            var mapWidth = 500
            var mapHeight = 250
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
}

window.addEventListener("load", function() {
    new MapWidget()
})
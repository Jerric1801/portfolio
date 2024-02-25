

class MapWidget {
    //canvas settings
    water_color = "rgb(10, 133, 255)"
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
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d')
        }

        this.build()
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
                this.ctx.fillStyle = 'rgb(34,139,34)'; // Set fill color with alpha (e.g., semi-transparent red)
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
// stock widget

const graph = document.getElementsByClassName('stock_graph')
const price = document.getElementsByClassName('stock_price')

function generate_graphs() {
    for (let i = 0; i < graph.length; i ++) {
        let graphitem = graph[i]
        let priceitem = price[i]

        var points = "";
        let x_point = 0
        var no_points = 20
        var sign = ""
        var first = 0
        var last = 0
        var difference = 0
        var color = "#39FF14"

        for (let i = 0; i < no_points; i ++) {
            x_point += 100/no_points
            var y_point = Math.random() * 100
            points += `${x_point * 2},${y_point/2} `

            if (i == no_points-2){
                first = y_point;
            }
            if(i == no_points-1) {
                last = y_point
                difference = last-first
                if (difference < 0) {
                    color = "#FF5733"
                }
                else {
                    sign = "+"
                }
            }
        }

        graphitem.style.background = "linear-gradient(to right, red 50%, transparent 50%);";
        
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%"); 
        svg.setAttribute("height", "100%"); 
        svg.setAttribute("viewBox", "0 0 250 50")


        const polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline')
        polyline.setAttribute("points", points)
        polyline.setAttribute("stroke", color);
        polyline.setAttribute("stroke-width", "4.5");
        polyline.setAttribute("fill", "none"); 

        svg.appendChild(polyline)
        graphitem.appendChild(svg)

        var price_container = document.createElement("div")

        var price_main = document.createElement("p")
        price_main.classList.add("stock_price_main")
        price_main.textContent = `${Math.round(last * 100)/100}`

        var price_diff = document.createElement("p")
        price_diff.classList.add("stock_price_diff")
        price_diff.textContent = `${sign}${Math.round(difference * 100)/100}`
        price_diff.style.color = color

        price_container.appendChild(price_main)
        price_container.appendChild(price_diff)

        priceitem.appendChild(price_container)


    }
}

generate_graphs()
// stock widget

const graph = document.getElementsByClassName('stock_graph')
const price = document.getElementsByClassName('stock_price')

function generate_graphs() {
    for (let i = 0; i < graph.length; i ++) {
        let graphitem = graph[i]
        let priceitem = price[i]

        var points = "";
        let x_point = 0
        var no_points = 15

        for (let i = 0; i < no_points; i ++) {
            x_point += 100/no_points
            let y_point = Math.random() * 100
            points += `${x_point},${y_point} `

            if (i == 0){
                var first = y_point;
            }
            if(i == 14) {
                var last = y_point
                var difference = last - first
                if (Math.sign(difference) == -1) {
                    var color = "green"
                }
                else {
                    var color = "red"
                }
            }
        }
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%"); 
        svg.setAttribute("height", "100%"); 
        svg.setAttribute("viewBox", "0 0 200 100")

        const polyline = document.createElementNS('http://www.w3.org/2000/svg','polyline')
        polyline.setAttribute("points", points)
        polyline.setAttribute("stroke", color);
        polyline.setAttribute("stroke-width", "1");
        polyline.setAttribute("fill", "none"); 

        svg.appendChild(polyline)
        graphitem.appendChild(svg)

        var price_container = document.createElement("div")

        var price_main = document.createElement("p")
        price_main.classList.add("stock_price_main")
        price_main.textContent = `$${Math.round(last * 100)/100}`

        var price_diff = document.createElement("p")
        price_diff.classList.add("stock_price_diff")
        price_diff.textContent = `$${Math.round(difference* 100)/10}`

        price_container.appendChild(price_main)
        price_container.appendChild(price_diff)

        priceitem.appendChild(price_container)


    }
}

generate_graphs()
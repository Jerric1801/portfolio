import { build_project } from "./projects.js";
// stock widget

class stockWidget {
    stock = document.getElementById("stocks")

    stock_items = {
        "cmc": ["CMC", "Regression Analysis"],
        "cmpn": ["CMPN", "Financial Companion"],
        "vti": ["VTI", "Vanguard Total Stock Market"]
    }

    constructor() {
        this.construct_widget()
        this.generate_graphs()
        this.bind_click()
    }
    construct_widget() {
        for (const key in this.stock_items) {
            let stockCon = document.createElement("div");
            let tickerCon = document.createElement("div")
            let graphCon = document.createElement("div")
            let priceCon = document.createElement("div")

            stockCon.className = "stock";
            tickerCon.className = "stock-ticker"
            graphCon.className = "stock-graph"
            priceCon.className = "stock-price"

            let value = this.stock_items[key]
            let ticker = value[0]
            let desc = value[1]
            const tickerText = document.createElement("p");
            const descText = document.createElement("p");


            tickerText.textContent = ticker
            descText.textContent = desc

            tickerCon.append(tickerText)
            tickerCon.append(descText)

            stockCon.append(tickerCon)
            stockCon.append(graphCon)
            stockCon.append(priceCon)

            this.stock.append(stockCon)

        }
    }
    generate_graphs() {
        const graph = document.getElementsByClassName('stock-graph')
        const price = document.getElementsByClassName('stock-price')
        for (let i = 0; i < graph.length; i++) {
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

            for (let i = 0; i < no_points; i++) {
                x_point += 100 / no_points
                var y_point = Math.random() * 100
                points += `${x_point * 2},${y_point / 2} `

                if (i == no_points - 2) {
                    first = y_point;
                }
                if (i == no_points - 1) {
                    last = y_point
                    difference = last - first
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


            const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
            polyline.setAttribute("points", points)
            polyline.setAttribute("stroke", color);
            polyline.setAttribute("stroke-width", "4.5");
            polyline.setAttribute("fill", "none");

            svg.appendChild(polyline)
            graphitem.appendChild(svg)

            var price_container = document.createElement("div")

            var price_main = document.createElement("p")
            price_main.classList.add("stock_price_main")
            price_main.textContent = `${Math.round(last * 100) / 100}`

            var price_diff = document.createElement("p")
            price_diff.classList.add("stock_price_diff")
            price_diff.textContent = `${sign}${Math.round(difference * 100) / 100}`
            price_diff.style.color = color

            price_container.appendChild(price_main)
            price_container.appendChild(price_diff)

            priceitem.appendChild(price_container)

        }
    }
}

$(window).on("load", function() {
    new stockWidget()
})

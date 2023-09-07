let items = JSON.parse(localStorage.getItem("items"))

displayOrders(items)

function displayOrders(items) {
    let order = document.querySelector(".order")

    items.forEach((item) => {
        let card = document.createElement("div")
        let img = document.createElement("img")
        let name = document.createElement("p")
        let price = document.createElement("h3")

        card.setAttribute("class", order-card)
        img.setAttribute("src", item.small)
        name.textContent = item.name
        price.textContent = item.price

        card.append(img, name, price)

        order.append(card)
    })
}
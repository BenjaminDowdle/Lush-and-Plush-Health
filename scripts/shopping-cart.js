let items = JSON.parse(localStorage.getItem("items"));

displayOrders(items);

function displayOrders(items) {
  // -----ORDER-----
  let order = document.querySelector(".order");
  let receipt = document.querySelector(".receipt");
  let priceTotal = 0.0;

  items.forEach((item) => {
    let card = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("p");
    let price = document.createElement("em");

    card.setAttribute("class", "order-card");
    img.setAttribute("src", item.small);
    img.setAttribute("class", "order-image");
    name.textContent = item.name;
    price.textContent = `$${item.price}`;

    card.append(img, name, price);

    order.append(card);

    // -----RECEIPT-----

    priceTotal += parseFloat(item.price);
  });
  let total = document.createElement("h2");
  total.textContent = `Total: $${priceTotal.toFixed(2)}`;
  receipt.append(total);
}

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

    let quantityAdjustment = document.createElement("div");
    let quantity = document.createElement("p");
    let increase = document.createElement("img");
    let decrease = document.createElement("img");

    card.setAttribute("class", "order-card");
    img.setAttribute("src", item.small);
    img.setAttribute("class", "order-image");
    name.textContent = item.name;
    price.textContent = `$${item.price}`;

    quantityAdjustment.setAttribute("class", "quantity-adjustment");
    quantity.textContent = item.quantity;

    increase.setAttribute("src", "./images/add.png");
    increase.setAttribute("class", "quantity-icon");
    // Add button click
    increase.addEventListener("click", () => {
      item.quantity++;
      quantity.textContent = item.quantity;
      item.price = (item.quantity * item.price)
      localStorage.setItem("items", JSON.stringify(items))
      priceTotal += item.price;
      total.textContent = `Subtotal: $${priceTotal.toFixed(2)}`
    });

    decrease.setAttribute("src", "./images/minus.png");
    decrease.setAttribute("class", "quantity-icon");
    // Minus button click
    decrease.addEventListener("click", () => {
      if(item.quantity > 1) {
        item.quantity--;
        quantity.textContent = item.quantity;
        item.price = (item.quantity * item.price)
        localStorage.setItem("items", JSON.stringify(items))
        priceTotal -= item.price;
        total.textContent = `Subtotal: $${priceTotal.toFixed(2)}`
      }
    });

    quantityAdjustment.append(increase, quantity, decrease);

    card.append(img, name, price, quantityAdjustment);

    order.append(card);

    // -----RECEIPT-----

    priceTotal += parseFloat(item.price);
  });
  let total = document.createElement("h2");  
  total.textContent = `Subtotal: $${priceTotal.toFixed(2)}`
  receipt.append(total);
}

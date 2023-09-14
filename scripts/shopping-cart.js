let items = JSON.parse(localStorage.getItem("items"));
let subtotal = 0.0;
subtotal = localStorage.setItem("subtotal", JSON.stringify(subtotal));
items.forEach((item) => {
  subtotal += item.price;
});

displayOrders(items, subtotal);

function displayOrders(items, subtotal) {
  // -----ORDER-----
  let order = document.querySelector(".order");
  let receipt = document.querySelector(".receipt");
  let total = document.createElement("h2");
  if ("subtotal" in localStorage) {
    subtotal = JSON.parse(localStorage.getItem("subtotal"));
  } else {
    subtotal = localStorage.setItem("subtotal", JSON.stringify(subtotal));
  }

  items.forEach((item) => {
    let card = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("p");
    let price = document.createElement("em");

    let trash = document.createElement("img");
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

    // Plus button click
    increase.setAttribute("src", "./images/add.png");
    increase.setAttribute("class", "quantity-icon");
    increase.addEventListener("click", () => {
      subtotal = JSON.parse(localStorage.getItem("subtotal"));
      subtotal = parseFloat(subtotal);
      item.quantity++;
      quantity.textContent = item.quantity;
      subtotal += parseFloat(item.price);
      total.textContent = `Subtotal: $${parseFloat(subtotal).toFixed(2)}`;
      localStorage.setItem("items", JSON.stringify(items));
      localStorage.setItem("subtotal", JSON.stringify(subtotal));
    });

    // Minus button click
    decrease.setAttribute("src", "./images/minus.png");
    decrease.setAttribute("class", "quantity-icon");
    decrease.addEventListener("click", () => {
      subtotal = JSON.parse(localStorage.getItem("subtotal"));
      subtotal = parseFloat(subtotal);
      if (item.quantity > 1) {
        item.quantity--;
        quantity.textContent = item.quantity;
        subtotal -= parseFloat(item.price);
        total.textContent = `Subtotal: $${parseFloat(subtotal).toFixed(2)}`;
        localStorage.setItem("items", JSON.stringify(items));
        localStorage.setItem("subtotal", JSON.stringify(subtotal));
      }
    });

    trash.setAttribute("src", "./images/delete.png");
    trash.setAttribute("class", "trash-icon");
    trash.addEventListener("click", () => {
      items = JSON.parse(localStorage.getItem("items"));
      let object = items.find((obj) => obj.key == item.key);
      let index = items.indexOf(object);
      items.splice(index, 1);
      console.log(object);
      localStorage.removeItem(item.key);
      localStorage.setItem("items", JSON.stringify(items));
      location.reload();
    });

    quantityAdjustment.append(increase, quantity, decrease);

    card.append(img, name, price, quantityAdjustment, trash);

    order.append(card);

    // -----RECEIPT-----
    subtotal += parseFloat(item.price * item.quantity);
    localStorage.setItem("subtotal", JSON.stringify(subtotal));
  });

  total.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  receipt.append(total);
}

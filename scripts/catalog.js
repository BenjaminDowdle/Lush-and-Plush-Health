const json =
  "https://benjamindowdle.github.io/Lush-and-Plush-Health/sources/products.json";
  let items = [];

async function apiFetch(json, func) {
  try {
    const response = await fetch(json);
    if (response.ok) {
      const data = await response.json();
      func(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch(json, createCard);

function createCard(products) {
  let catalog = document.querySelector("#catalog");
  if ("items" in localStorage) {
    items = JSON.parse(localStorage.getItem("items"));
  } else {
    localStorage.setItem("items", JSON.stringify(items))
  }

  products.soaps.forEach((soap, index) => {
    let img = document.createElement("img");
    let name = document.createElement("h3");
    let price = document.createElement("p");
    let button = document.createElement("button");
    let card = document.createElement("div");
    let clicked = false;

    button.setAttribute("type", "button");
    button.setAttribute("class", "add-to-cart");
    button.setAttribute("id", index);
    button.innerText = "Add to Cart";

    img.setAttribute("src", soap.small);
    name.innerText = soap.name;
    price.innerText = `$${soap.price}`;

    card.setAttribute("class", "card");
    card.append(img, name, price, button);

    catalog.append(card);

    button.addEventListener("click", () => {
      items = JSON.parse(localStorage.getItem("items"))
      let item = {
          key: soap.id,
          name: soap.name,
          price: soap.price,
          small: soap.small,
          quantity: 1,
        };
        if (clicked == true) {
          window.location.href = "shopping-cart.html";
        } else if (item.key in localStorage) {
          window.alert("This item is already in the cart. Redirecting to the Cart...")
          window.location.href = "shopping-cart.html";
        } else {
          items.push(item);
          localStorage.setItem(item.key, JSON.stringify(item));
          localStorage.setItem("items", JSON.stringify(items))
          button.innerText = "View Cart";
          clicked = true;
        }
    });
  });
}

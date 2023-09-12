const json =
  "https://benjamindowdle.github.io/Lush-and-Plush-Health/sources/products.json";

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
  let items = [];

  if ("items" in localStorage) {
    items = JSON.parse(localStorage.getItem("items"));
  } else {
    items = [];
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
      if (clicked == false) {
        let item = {
          name: soap.name,
          price: soap.price,
          small: soap.small,
          quantity: 1,
        };
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));

        button.innerText = "View Cart";
        clicked = true;
      } else {
        window.location.href = "shopping-cart.html";
      }
    });
  });
}

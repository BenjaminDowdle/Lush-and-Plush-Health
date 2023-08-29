const json = "./sources/products.json";

async function apiFetch(json, func) {
  try {
    const response = await fetch(json);
    if (response.ok) {
      const data = await response.json();
      func(data);
      console.log(data);
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

  products.soaps.forEach((soap) => {
    let img = document.createElement("img");
    let name = document.createElement("h3");
    let price = document.createElement("p");
    let button = document.createElement("button");
    let card = document.createElement("div");

    img.setAttribute("src", soap.small);
    button.setAttribute("type", "button");
    button.innerText = "Add to Cart";
    name.innerText = soap.name;
    price.innerText = soap.price;

    card.setAttribute("class", "card")
    card.append(img, name, price, button);

    catalog.append(card);
  });
}

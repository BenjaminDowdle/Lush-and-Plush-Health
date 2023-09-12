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

apiFetch(json, generateSpotlights);

function generateSpotlights(data) {
  const count = 3;
  let numbers = [];
  let spotlight = document.querySelector("#spotlight");
  let items = [];
  if ("items" in localStorage) {
    items = JSON.parse(localStorage.getItem("items"));
  } else {
    items = [];
  }

  while (numbers.length < count) {
    let number = Math.floor(Math.random() * data.soaps.length);

    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }

  for (let i = 0; i <= count; i++) {
    let img = document.createElement("img");
    let name = document.createElement("h3");
    let basePrice = document.createElement("p");
    let button = document.createElement("button");
    let card = document.createElement("div");
    let clicked = false;

    img.setAttribute("src", data.soaps[numbers[i]].small);
    button.setAttribute("type", "button");
    button.setAttribute("class", "add-to-cart");
    button.innerText = "Add to Cart";
    name.innerText = data.soaps[numbers[i]].name;
    basePrice.innerText = `$${data.soaps[numbers[i]].basePrice}`;

    card.setAttribute("class", "card");
    card.append(img, name, basePrice, button);

    spotlight.append(card);

    button.addEventListener("click", () => {
      if (clicked == false) {
        let item = {
          name: data.soaps[numbers[i]].name,
          price: data.soaps[numbers[i]].price,
          basePrice: data.soaps[numbers[i]].basePrice,
          small: data.soaps[numbers[i]].small,
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
  }
}

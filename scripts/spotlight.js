const json =
  "https://benjamindowdle.github.io/Lush-and-Plush-Health/sources/products.json";
let items = []

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
  if ("items" in localStorage) {
    items = JSON.parse(localStorage.getItem("items"));
  } else {
    localStorage.setItem("items", JSON.stringify(items));
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
    let price = document.createElement("p");
    let button = document.createElement("button");
    let card = document.createElement("div");
    let clicked = false;

    img.setAttribute("src", data.soaps[numbers[i]].small);
    button.setAttribute("type", "button");
    button.setAttribute("class", "add-to-cart");
    button.innerText = "Add to Cart";
    name.innerText = data.soaps[numbers[i]].name;
    price.innerText = `$${data.soaps[numbers[i]].price}`;

    card.setAttribute("class", "card");
    card.append(img, name, price, button);

    spotlight.append(card);

    button.addEventListener("click", () => {
      let items = JSON.parse(localStorage.getItem("items"))
        let item = {
          key: data.soaps[numbers[i]].id,
          name: data.soaps[numbers[i]].name,
          price: data.soaps[numbers[i]].price,
          small: data.soaps[numbers[i]].small,
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
  }
}

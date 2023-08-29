const json = "./sources/products.json";

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

apiFetch(json, generateSpotlights)

function generateSpotlights(data) {
    const count = 3
    let numbers = []
    let spotlight = document.querySelector('#spotlight')

    while(numbers.length < count) {
        let number = Math.floor(Math.random() * (data.soaps.length))

        if(!numbers.includes(number)) {
            numbers.push(number)
        }
    }

    for(let i = 0; i <= count; i++){
        let img = document.createElement("img");
        let name = document.createElement("h3");
        let price = document.createElement("p");
        let button = document.createElement("button");
        let card = document.createElement("div");

        img.setAttribute("src", data.soaps[numbers[i]].image);
        button.setAttribute("type", "button");
        button.innerText = "Add to Cart";
        name.innerText = data.soaps[numbers[i]].name;
        price.innerText = data.soaps[numbers[i]].price;

        card.setAttribute("class", "card")
        card.append(img, name, price, button);

        spotlight.append(card);
    }
}
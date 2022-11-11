let $form = document.querySelector(".form");
let $imgWrapper = document.querySelector(".img-wrapper");
let $qty = document.querySelectorAll(".qty");
let $qtyWrapper = document.querySelector(".input-div.product");
let $addProduct = document.querySelector(".add-product");
let $submit = document.querySelector(".submit");
let $loading = document.querySelector(".loading");
let $sucess = document.querySelector(".sucess");
let $error = document.querySelector(".error");
let productsQty = 1;

function updateButton(selector1, selector2) {
  let $buttons = [];

  $buttons.push(document.querySelector(selector1));
  $buttons.push(document.querySelector(selector2));

  $buttons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      let position = (event.target).getAttribute("data-position");
      let $input = document.querySelector(`input.qty[data-position='${position}']`);
      let inputQty = $input.getAttribute("value");

      if ((event.target).value === "plus") {
        inputQty++;
        $input.setAttribute("value", inputQty);
      }
      else {
        if (inputQty > 1) {
          inputQty--;
          $input.setAttribute("value", inputQty);
        }
      }
    });
  });
}

function addProduct() {
  $qtyWrapper.insertAdjacentHTML("beforeend", `<div class="input-wrapper"><input inputmode="numeric" type="number" name="code" id="product-code" placeholder="Código do produto" required><div class="qty-wrapper"><button class="button plus" value="plus" data-position="${productsQty}">+</button><input class="qty" inputmode="numeric" type="number" name="qty" value="1" id="product-qty" data-position="${productsQty}"><button class="button minus" value="minus" data-position="${productsQty}">-</button></div></div>`);

  updateButton(`button.plus[data-position="${productsQty}"]`, `button.minus[data-position="${productsQty}"]`);

  productsQty++;
};

addProduct();

$addProduct.addEventListener("click", event => {
  event.preventDefault();

  addProduct();
});

$form.addEventListener("submit", event => {
  event.preventDefault();

  $form.style.display = "none";
  $imgWrapper.style.display = "none";
  $loading.style.display = "block";

  let $inputs = (event.target).querySelectorAll("input");

  let products = [];

  for (let index = 1; index < $inputs.length; index += 2) {
    products.push({
      "code": $inputs[index].value,
      "qty": $inputs[index + 1].value
    });
  }

  let request = {
    "dealerCode": $inputs[0].value,
    "email": dealerEmail,
    "products": products
  }

  let options = {
    "method": "POST",
    "headers": {
      "content-type": "application/json"
    },
    "body": JSON.stringify(request)
  };

  // fetch("http://localhost:2412/pedido/enviar", options)
  fetch("https://revendedoras-avon.up.railway.app/pedido/enviar", options)
    .then(response => {
      $loading.style.display = "none";

      if (response.ok) {
        $sucess.style.display = "block";
      }
      else {
        $error.style.display = "block";
      }
    });
});
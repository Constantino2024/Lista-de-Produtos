const menu = document.getElementById("menu");
const itemsCart = document.getElementById("items-Carrinho");
const itemsModal = document.getElementById("items-modal");
const cartCount = document.getElementById("cart-count");
const foto = document.getElementById("foto");
const footerCarrinho = document.getElementById("footer-carrinho");
const modal = document.getElementById("abrir-modal");
const cartModal = document.getElementById("cart-modal");
const cartTotal = document.getElementById("total-preco");
const totalModal = document.getElementById("total-modal");
const btnCart = document.getElementById("btn-cart");
const btnFechar = document.getElementById("btnFechar");

let cart = [];

menu.addEventListener("click", function (event) {
  let parentButton = event.target.closest(".add-cart");

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));
    const imagem = parentButton.getAttribute("data-foto");
    foto.style.display = "none";
    footerCarrinho.style.display = "block";

    //Adicionar no carrinho
    addToCart(name, price, imagem);
  }
});

function addToCart(name, price, imagem) {
  const existe = cart.find((item) => item.name === name);

  if (existe) {
    //Se existir item igual, aumenta a quantidade
    existe.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      imagem,
      quantity: 1,
    });
  }

  updateCarrinho();
}

function updateCarrinho() {
  itemsCart.innerHTML = "";
  let total = 0;
  let quantidade = 0;
  let totPreco = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("elemento-carrinho");

    totPreco = item.price * item.quantity;
    cartItemElement.innerHTML = `
        <div class="elemento">
            <div class="produto-cart">
                <p class="nome-prod">${item.name}</p>
                <div class="preco-quant">
                    <p class="quant">${item.quantity}x</p>
                    <p>@ $${item.price.toFixed(2)}</p>
                    <p class="totPrecoProd">$ ${totPreco.toFixed(2)}</p>
                </div>
                
            </div>
            <button class="remove-from-cart-btn" data-name="${item.name}">
                X
            </button>
        </div>
        `;
    total += item.price * item.quantity;
    quantidade += item.quantity;
    itemsCart.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });

  if (quantidade === 0) {
    foto.style.display = "flex";
    footerCarrinho.style.display = "none";
  } else {
    foto.style.display = "none";
    footerCarrinho.style.display = "block";
  }

  cartCount.innerHTML = quantidade;
}

//Remover Produto do Carrinho
itemsCart.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");

    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];
    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCarrinho();
      return;
    }

    cart.splice(index, 1);
    updateCarrinho();
  }
}

//Abrir o Modal
modal.addEventListener("click", function () {
  updateModal();
  cartModal.style.display = "flex";
});
//fechar modal
cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});
btnFechar.addEventListener("click", function (event) {
  cartModal.style.display = "none";
});

//Actualização do Modal

function updateModal() {
  itemsModal.innerHTML = "";
  let total = 0;
  let totPreco = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("elemento-modal");

    totPreco = item.price * item.quantity;
    cartItemElement.innerHTML = `
        <div class="modal-elem">
            <div class="produto-cart-modal">
                <div class="img-modal">
                    <img src="${item.imagem}"/>
                </div>
                <div class="produto-info">
                    <p class="nome-prod-modal">${item.name}</p>
                    <div class="preco-quant-modal">
                        <p class="quant-modal">${item.quantity}x</p>
                        <p>@ $${item.price.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            <h2 class="totPrecoProd-modal">$ ${totPreco.toFixed(2)}</h2>
        </div>
        `;
    total += item.price * item.quantity;
    itemsModal.appendChild(cartItemElement);
  });

  totalModal.textContent = total.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  });
}

btnCart.addEventListener("click", function () {
  alert("Limpou os Campos");
  cart = [];
  updateCarrinho();
  updateModal();
  cartModal.style.display = "none";
});

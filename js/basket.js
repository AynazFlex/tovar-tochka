const [stock, stockDisable] = document.body.querySelectorAll(".stock");
const stockButton = stock.querySelector(".stock__button");
const stockDisableButton = stockDisable.querySelector(".stock__button");
export const stockContainer = stock.querySelector(".stock__container");
const stcokDisableContainer = stockDisable.querySelector(".stock__container");
const checkbox = stock.querySelector(".stock__checkbox");
export const stockInfo = stock.querySelector(".stock__info-in-dis");
export const products = stockContainer.querySelectorAll(".product");


stockButton.addEventListener("click", () => {
  stockContainer.classList.toggle("stock__container-disabled");
  stockButton.classList.toggle("stock__button-rotate");
  stock.classList.toggle("stock__mrb-16");
  checkbox.classList.toggle("stock__panel-elem-close");
  stockInfo.classList.toggle("stock__panel-elem-close");
});

stockDisableButton.addEventListener("click", () => {
  stcokDisableContainer.classList.toggle("stock__container-disabled");
  stockDisableButton.classList.toggle("stock__button-rotate");
});
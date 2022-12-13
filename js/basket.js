const [stock, stockDisable] = document.body.querySelectorAll(".stock");
const stockButton = stock.querySelector(".stock__button");
const stockDisableButton = stockDisable.querySelector(".stock__button");
const stcokContainer = stock.querySelector(".stock__container");
const stcokDisableContainer = stockDisable.querySelector(".stock__container");
const checkbox = stock.querySelector(".stock__checkbox");
const stockInfo = stock.querySelector(".stock__info-in-dis");
const checkboxAll = stock.querySelector("#selectAll");
const products = () => Array.from(stcokContainer.querySelectorAll(".product"));
const reg = /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g;
const totalPrice = document.body.querySelector("#total_price");

products().forEach(function (product) {
  const amount = product.querySelector(".product__count");
  const totalPrice = product.querySelectorAll(".product__total-sum");
  const unitPrice =
    totalPrice[0].textContent.replace(/\s/g, "") / amount.textContent;
  product.addEventListener("click", function (e) {
    const elem = e.target;
    if (elem.closest(".product__handling-minus")) {
      amount.textContent -= 1;
      const count = `${Math.round(amount.textContent * unitPrice)}`.replace(
        reg,
        "$1" + " "
      );
      totalPrice[0].textContent = count;
      totalPrice[1].textContent = count;
      calculation()
      this.querySelector(".product__handling-plus").disabled = false;
      if (amount.textContent === "1") elem.disabled = true;
    }
    if (elem.closest(".product__handling-plus")) {
      const maxValue = this.querySelector(".product__limit")?.textContent;
      amount.textContent = +amount.textContent + 1;
      const count = `${Math.round(amount.textContent * unitPrice)}`.replace(
        reg,
        "$1" + " "
      );
      totalPrice[0].textContent = count;
      totalPrice[1].textContent = count;
      calculation()
      this.querySelector(".product__handling-minus").disabled = false;
      if (amount.textContent === maxValue) elem.disabled = true;
    }
    if (elem.closest(".product__state-delete")) {
      this.remove();
      calculation();
    }
  });

  product
    .querySelector(".product__img-select>input")
    .addEventListener("change", (e) => {
      checkboxAll.checked = e.target.checked
        ? !checkboxes().find((item) => item.checked === false)
        : false;
      calculation();
    });
});

stockButton.addEventListener("click", () => {
  stcokContainer.classList.toggle("stock__container-disabled");
  stockButton.classList.toggle("stock__button-rotate");
  stock.classList.toggle("stock__mrb-16");
  checkbox.classList.toggle("stock__panel-elem-close");
  stockInfo.classList.toggle("stock__panel-elem-close");
});

stockDisableButton.addEventListener("click", () => {
  stcokDisableContainer.classList.toggle("stock__container-disabled");
  stockDisableButton.classList.toggle("stock__button-rotate");
});

checkboxAll.addEventListener("change", (e) => {
  if (e.target.checked) {
    checkboxes().forEach((item) => (item.checked = true));
  } else {
    checkboxes().forEach((item) => (item.checked = false));
  }
  calculation();
});

function checkboxes() {
  return products().map((elem) =>
    elem.querySelector(".product__img-select>input")
  );
}

function calculation() {
  totalPrice.textContent = `${products()
    .reduce(
      (sum, item) =>
        item.querySelector(".product__img-select>input").checked
          ? +item
              .querySelectorAll(".product__total-sum")[0]
              .textContent.replace(/\s/g, "") + sum
          : sum,
      0
    ).toString().replace(reg, "$1" + " ")} сом`;
}

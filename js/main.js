import "./forms.js";
import "./interface.js";
import products from "./store/store.js";
import { stockContainer } from "./basket.js";
import { payment, submit } from "./forms.js";
import { stockInfo } from "./basket.js";
const reg = /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g;
const selectAllElem = document.body.querySelector("[name=selectAll]");

products.addConsumer((state) => {
  const elem = document.body.querySelector(".header__basket-label");
  elem.textContent = state.amount;
  elem.style.display = state.amount ? "flex" : "none";
  state.products.length === 0 && stockContainer.parentNode.remove();
});

products.addConsumer((state) => {
  const totalDiscount = state.totalDiscountSum
    .toString()
    .replace(reg, "$1" + " ");
  const total = state.totalSum.toString().replace(reg, "$1" + " ");
  const discount = state.discountSum.toString().replace(reg, "$1" + " ");
  const amount = state.amount;
  const amountText = amount === 1 ? "товар" : amount < 5 ? "товара" : "товаров";
  document.body.querySelector(
    "#total_price>span"
  ).textContent = totalDiscount;
  document.body.querySelector(
    "#total_price_without_discount"
  ).textContent = `${total} сом`;
  document.body.querySelector("#discount").textContent = `${discount} сом`;
  document.body.querySelector(
    "#amount"
  ).textContent = `${amount} ${amountText}`;
  stockInfo.textContent = `${amount} ${amountText} · ${totalDiscount} сом`;
  if (payment.checked) submit.textContent = `Оплатить ${totalDiscount} сом`;
  selectAllElem.checked = state.selectAll;
});

function deliveryProduct(product, productAmount) {
  product.textContent = productAmount;
  productAmount <= 1 ? product.classList.add('delivery__disabled') : product.classList.remove('delivery__disabled')
}

products.addConsumer(state => {
  const [UZcotton, case1, pencils, case2] = document.querySelectorAll(".delivery__img-count")
  state.products.forEach(product => {
    const productAmount = product.productAmount
    switch (product.id) {
      case "UZcotton": {
        deliveryProduct(UZcotton, productAmount)
        break;
      }
      case "case": {
        if(productAmount > 16) deliveryProduct(case1, productAmount - 16)
        else {
          case1.textContent = 0;
          deliveryProduct(case2, productAmount)
        }
        break;
      }
      case "pencils": {
        deliveryProduct(pencils, productAmount)
      }
    }
  })
})

selectAllElem.addEventListener("change", (e) => {
  products.dispatchEvent([
    {
      type: "SELECT_PRODUCTS",
      checked: e.target.checked,
    },
    { type: "CALCULATE" },
  ]);
  console.log(products.getSelector((state) => state.products))
});

stockContainer.querySelectorAll(".product").forEach((item) => {
  const countElem = item.querySelector(".product__count");
  const plusElem = item.querySelector(".product__handling-plus");
  const minusElem = item.querySelector(".product__handling-minus");
  const checkElem = item.querySelector(".custom-checkbox-1");
  const priceDiscountElems = item.querySelectorAll(".product__total-sum");
  const priceElems = item.querySelectorAll(".product__price>span");
  const deleteElem = item.querySelector(".product__state-delete");

  deleteElem.addEventListener("click", () => {
    products.dispatchEvent([
      {
        type: "DELETE_PRODUCT",
        id: item.dataset.id,
      },
      { type: "CALCULATE" },
    ]);
    item.remove();
  });

  products.addConsumer((state) => {
    const product = state.products.find(
      (product) => product.id === item.dataset.id
    );
    if (product) {
      const totalDiscountPrice = product.totalDiscountPrice
        .toString()
        .replace(reg, "$1" + " ");
      const totalPrice = product.totalPrice.toString().replace(reg, "$1" + " ");
      countElem.textContent = product.productAmount;
      checkElem.checked = product.productSelected;
      plusElem.disabled = product.maxValue === product.productAmount;
      minusElem.disabled = product.productAmount === 1;
      priceDiscountElems.forEach(
        (elem) => (elem.textContent = totalDiscountPrice)
      );
      priceElems.forEach((elem) => (elem.textContent = totalPrice));
    }
  });

  checkElem.addEventListener("change", (e) => {
    products.dispatchEvent([
      {
        type: "SELECT_PRODUCT",
        checked: e.target.checked,
        id: item.dataset.id,
      },
      { type: "CALCULATE" },
    ]);
  });

  plusElem.addEventListener("click", () => {
    products.dispatchEvent([
      {
        type: "PLUS_PRODUCT",
        id: item.dataset.id,
      },
      { type: "CALCULATE" },
    ]);
  });

  minusElem.addEventListener("click", () => {
    products.dispatchEvent([
      {
        type: "MINUS_PRODUCT",
        id: item.dataset.id,
      },
      { type: "CALCULATE" },
    ]);
  });
});



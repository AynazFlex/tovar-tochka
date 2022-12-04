const modal_payment = document.body.querySelector("#modal_payment"); // модальное окно для спсоба оплаты
const modal_delivery = document.body.querySelector("#modal_delivery");
const deliveryPoint = modal_delivery.querySelector(".delivery__point");
const deliveryCourier = modal_delivery.querySelector(".delivery__courier");
const pointerSelectItems = modal_delivery.querySelector(
  ".delivery-select__point-items"
);
const courierSelectItems = modal_delivery.querySelector(
  ".delivery-select__courier-items"
);
const paymentItems = modal_payment.querySelectorAll(".payment-select__item");
const paymentDone = modal_payment.querySelector(".modal__container-done");
const totalCardDetails = document.body.querySelector(".total__card-details");
const paymentContainer = document.body.querySelector(".payment__container");
const deliveryDone = modal_delivery.querySelector(".modal__container-done");
const totalTitle = document.body.querySelector(".total__edit>h4");
const deliverytitle = document.body.querySelector(".delivery__address-title");
const totalAddress = document.body.querySelector(".total__delivery-address");
const deliveryAddress = document.body.querySelector(".delivery__address>span");
const deliveryStar = document.body.querySelector(".delivery__grade>span");

const deliveryMethod = {
  title1: "Адрес доставки",
  title2: "Адрес доставки",
};

deliveryDone.addEventListener("click", () => {
  const activeItems = modal_delivery.querySelectorAll(
    ".delivery__select-active>.delivery-select__item"
  );
  for (const elem of activeItems) {
    if (elem.querySelector("input").checked) {
      totalTitle.textContent = deliveryMethod.title1;
      deliverytitle.textContent = deliveryMethod.title2;
      totalAddress.textContent = elem.querySelector("input").value;
      deliveryAddress.textContent = elem.querySelector("input").value;
      deliveryStar.textContent = elem.querySelector("input").dataset.star;
      modal_delivery.classList.remove("modal__open");
      document.body.style.overflow = "auto";
      break;
    }
  }
});

paymentDone.addEventListener("click", () => {
  for (const elem of paymentItems) {
    if (elem.querySelector("input").checked) {
      totalCardDetails.innerHTML = elem.querySelector("label").innerHTML;
      paymentContainer.innerHTML =
        elem.querySelector("label").innerHTML +
        '<span class="payment__date">01/30</span>';
      modal_payment.classList.remove("modal__open");
      document.body.style.overflow = "auto";
      break;
    }
  }
});

button_delivery_1.addEventListener("click", modalDeliveryOpen);
button_delivery_2.addEventListener("click", modalDeliveryOpen);
button_payment_1.addEventListener("click", modalPaymentOpen);
button_payment_2.addEventListener("click", modalPaymentOpen);

modal_payment.addEventListener("click", modalClose);
modal_delivery.addEventListener("click", modalClose);

deliveryPoint.addEventListener("click", (event) => {
  deliveryMethod.title1 = "Доставка в пункт выдачи";
  deliveryMethod.title2 = "Пункт выдачи";
  event.currentTarget.classList.add("delivery__btn-active");
  deliveryCourier.classList.remove("delivery__btn-active");
  courierSelectItems.classList.remove("delivery__select-active");
  pointerSelectItems.classList.add("delivery__select-active");
});

deliveryCourier.addEventListener("click", (event) => {
  deliveryMethod.title1 = "Адрес доставки";
  deliveryMethod.title2 = "Адрес доставки";
  event.currentTarget.classList.add("delivery__btn-active");
  deliveryPoint.classList.remove("delivery__btn-active");
  pointerSelectItems.classList.remove("delivery__select-active");
  courierSelectItems.classList.add("delivery__select-active");
});

function modalPaymentOpen() {
  modal_payment.classList.add("modal__open");
  document.body.style.overflow = "hidden";
}

function modalDeliveryOpen() {
  modal_delivery.classList.add("modal__open");
  document.body.style.overflow = "hidden";
}

function modalClose(e) {
  if (
    e.target.closest(".modal__container-close") ||
    !e.target.closest(".modal__container")
  ) {
    this.classList.remove("modal__open");
    document.body.style.overflow = "auto";
  }
}

const form = document.forms.user_form;
const input_name = form.user_name;
const input_surname = form.user_surname;
const input_email = form.user_email;
const input_inn = form.user_inn;
const input_phone = form.user_phone;
const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const submit = document.body.querySelector(".total__order");
const total_payment_info = document.body.querySelector(".total__payment-info");
const payment = document.body.querySelector("#payment");
const payment_message = document.body.querySelector(".payment__message")

input_name.addEventListener("focus", focus);
input_surname.addEventListener("focus", focus);
input_email.addEventListener("focus", focus);
input_inn.addEventListener("focus", focus);
input_phone.addEventListener("focus", focus);

input_name.addEventListener("blur", function () {
  if (!this.value) errorEmtyInput.call(this, "Укажите имя");
});

input_surname.addEventListener("blur", function () {
  if (!this.value) errorEmtyInput.call(this, "Введите фамилию");
});

input_email.addEventListener("blur", function () {
  const value = this.value;
  if (!value) errorEmtyInput.call(this, "Укажите электронную почту");
  else if (!EMAIL_REGEXP.test(value)) {
    errorValidInput.call(this, "Проверьте адрес электронной почты");
  }
});

input_inn.addEventListener("blur", function () {
  const value = this.value;
  if (!value) {
    errorEmtyInput.call(this, "Укажите индекс");
    this.nextElementSibling.classList.remove("form__error-inner");
  } else if (value.length < 7 || value.length > 10) {
    errorValidInput.call(this, "Формат: 1234567");
    this.nextElementSibling.classList.remove("form__error-inner");
  } else {
    this.nextElementSibling.textContent = "Для таможенного оформления";
    this.nextElementSibling.classList.add("form__error-inner");
  }
});

input_phone.addEventListener("blur", function () {
  const value = this.value;
  if (!value) errorEmtyInput.call(this, "Укажите номер телефона");
  else if (value.replace(/\D+/g, "").length < 11) {
    errorValidInput.call(this, "Формат: +9 999 999 99 99");
  }
});

input_name.addEventListener("input", function () {
  this.value && input.call(this);
});

input_surname.addEventListener("input", function () {
  this.value && input.call(this);
});

input_email.addEventListener("input", function () {
  EMAIL_REGEXP.test(this.value) && input.call(this);
});

input_inn.addEventListener("input", function () {
  const value = this.value;
  const last = value[value.length - 1];
  if (!"0123456789".includes(last))
    input_inn.value = value.slice(0, value.length - 1);
  if (value.length > 6 && value.length < 11) {
    this.nextElementSibling.textContent = "Для таможенного оформления";
    this.nextElementSibling.classList.add("form__error-inner");
    this.classList.remove("input__error");
  }
});

input_phone.addEventListener("input", function () {
  const value = this.value;
  const numbers = value.replace(/\D+/g, "").slice(0, 11);
  this.value = numbers
    .split("")
    .map((item, i) => {
      switch (i) {
        case 0:
          return item === "8" ? item : `+${item}`;
        case 1:
        case 4:
        case 7:
        case 9:
          return ` ${item}`;
        default:
          return item;
      }
    })
    .join("");
  numbers.length === 11 && input.call(this);
});

submit.addEventListener("click", () => {
  for (const elem of form.elements) {
    if (!elem.value || elem.classList.contains("input__error")) {
      return elem.focus();
    }
  }
  alert("Заказ оформлен");
});

payment.addEventListener("change", (e) => {
  const checked = e.target.checked;
  if (checked) {
    submit.textContent = `Оплатить ${total_price.textContent}`;
    total_payment_info.textContent = null;
    payment_message.textContent = null;
  } else {
    submit.textContent = "Заказать";
    total_payment_info.textContent = "Спишем оплату с карты при получении";
    payment_message.textContent = "Спишем оплату с карты при получении";
  }
});

function focus() {
  this.previousElementSibling.classList.add("label__active");
}

function errorEmtyInput(error_text) {
  this.nextElementSibling.textContent = error_text;
  this.classList.add("input__error");
  this.previousElementSibling.classList.remove("label__active");
}

function errorValidInput(error_text) {
  console.log(error_text);
  this.nextElementSibling.textContent = error_text;
  this.classList.add("input__error");
}

function input() {
  this.nextElementSibling.textContent = null;
  this.classList.remove("input__error");
}

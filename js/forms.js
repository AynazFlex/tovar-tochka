"use strict";

const form = document.forms.user_form;
const input_name = form.user_name;
const input_surname = form.user_surname;
const input_email = form.user_email;
const input_inn = form.user_inn;
const input_phone = form.user_phone;
const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const submit = document.body.querySelector('.total__order')

input_name.addEventListener("blur", (e) => {
  if (!e.target.value) {
    form.querySelector(".form__name>.form__error").textContent = "Укажите имя";
    input_name.classList.add("input__error");
    form.querySelector(".form__name>label").classList.remove("label__active");
  }
});

input_name.addEventListener("input", (e) => {
  if (e.target.value) {
    form.querySelector(".form__name>.form__error").textContent = null;
    input_name.classList.remove("input__error");
  }
});

input_name.addEventListener("focus", () => {
  form.querySelector(".form__name>label").classList.add("label__active");
});

input_surname.addEventListener("blur", (e) => {
  if (!e.target.value) {
    form.querySelector(".form__surname>.form__error").textContent =
      "Введите фамилию";
    input_surname.classList.add("input__error");
    form
      .querySelector(".form__surname>label")
      .classList.remove("label__active");
  }
});

input_surname.addEventListener("input", (e) => {
  if (e.target.value) {
    form.querySelector(".form__surname>.form__error").textContent = null;
    input_surname.classList.remove("input__error");
  }
});

input_surname.addEventListener("focus", () => {
  form.querySelector(".form__surname>label").classList.add("label__active");
});

input_email.addEventListener("blur", (e) => {
  const value = e.target.value;
  if (!value) {
    form.querySelector(".form__email>.form__error").textContent =
      "Укажите электронную почту";
    input_email.classList.add("input__error");
    form.querySelector(".form__email>label").classList.remove("label__active");
  } else if (!EMAIL_REGEXP.test(value)) {
    form.querySelector(".form__email>.form__error").textContent =
      "Проверьте адрес электронной почты";
    input_email.classList.add("input__error");
  }
});

input_email.addEventListener("focus", () => {
  form.querySelector(".form__email>label").classList.add("label__active");
});

input_email.addEventListener("input", (e) => {
  if (EMAIL_REGEXP.test(e.target.value)) {
    form.querySelector(".form__email>.form__error").textContent = null;
    input_email.classList.remove("input__error");
  }
});

input_inn.addEventListener("focus", () => {
  form.querySelector(".form__inn>label").classList.add("label__active");
});

input_inn.addEventListener("input", (e) => {
  const value = e.target.value;
  const last = value[value.length - 1];
  if (!"0123456789".includes(last))
    input_inn.value = value.slice(0, value.length - 1);
  if (value.length > 6 && value.length < 11) {
    form.querySelector(".form__inn>.form__error").textContent =
      "Для таможенного оформления";
    form
      .querySelector(".form__inn>.form__error")
      .classList.add("form__error-inner");
    input_inn.classList.remove("input__error");
  }
});

input_inn.addEventListener("blur", (e) => {
  const value = e.target.value;
  !value &&
    form.querySelector(".form__inn>label").classList.remove("label__active");
  if (!value || value.length < 7 || value.length > 10) {
    form.querySelector(".form__inn>.form__error").textContent =
      "Формат: 1234567";
    form
      .querySelector(".form__inn>.form__error")
      .classList.remove("form__error-inner");
    input_inn.classList.add("input__error");
  } else {
    form.querySelector(".form__inn>.form__error").textContent =
      "Для таможенного оформления";
    form
      .querySelector(".form__inn>.form__error")
      .classList.add("form__error-inner");
    input_inn.classList.remove("input__error");
  }
});

input_phone.addEventListener("focus", () => {
  form.querySelector(".form__phone>label").classList.add("label__active");
});

input_phone.addEventListener("blur", (e) => {
    const value = e.target.value;
  if (!value) {
    form.querySelector(".form__phone>.form__error").textContent =
      "Укажите номер телефона";
    input_phone.classList.add("input__error");
    form.querySelector(".form__phone>label").classList.remove("label__active");
  } else if (value.replace(/\D+/g, "").length < 11) {
    form.querySelector(".form__phone>.form__error").textContent = 'Формат: +9 999 999 99 99';
    input_phone.classList.add("input__error");
  }
});

input_phone.addEventListener("input", (e) => {
  const value = e.target.value;
  const numbers = value.replace(/\D+/g, "").slice(0, 11);
  input_phone.value = numbers
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
    if(numbers.length === 11) {
        form.querySelector(".form__phone>.form__error").textContent = null;
        input_phone.classList.remove("input__error");
    }
})

submit.addEventListener("click", () => {
    for(const elem of form.elements) {
        if(!elem.value || elem.classList.contains("input__error")) {
            elem.focus()
            return
        }
    }
    alert('Заказ оформлен')
})


payment.addEventListener('change', (e) => {
    submit.textContent = e.target.checked ? `Оплатить ${total_price.textContent}` : 'Заказать'
})
"use strict"

const modal_payment = document.body.querySelector('#modal_payment') // модальное окно для спсоба оплаты
const modal_delivery = document.body.querySelector('#modal_delivery')
const modals = document.body.querySelectorAll('.modal__wrapper') // массив модальных окон
const deliveryPoint = document.body.querySelector('.delivery__point')
const deliveryCourier = document.body.querySelector('.delivery__courier')
const pointerSelectItems = document.body.querySelector('.delivery-select__point-items')
const courierSelectItems = document.body.querySelector('.delivery-select__courier-items')
const payment = document.body.querySelector('#payment')

button_delivery_1.addEventListener('click', modalDeliveryOpen)
button_delivery_2.addEventListener('click', modalDeliveryOpen)
button_payment_1.addEventListener('click', modalPaymentOpen)
button_payment_2.addEventListener('click', modalPaymentOpen)

modals.forEach((modal) => modal.addEventListener('click', modalClose))

deliveryPoint.addEventListener('click', (event) => {
    event.currentTarget.classList.add('delivery__btn-active')
    deliveryCourier.classList.remove('delivery__btn-active')
    courierSelectItems.classList.remove('delivery__select-active')
    pointerSelectItems.classList.add('delivery__select-active')
})

deliveryCourier.addEventListener('click', (event) => {
    event.currentTarget.classList.add('delivery__btn-active')
    deliveryPoint.classList.remove('delivery__btn-active')
    pointerSelectItems.classList.remove('delivery__select-active')
    courierSelectItems.classList.add('delivery__select-active')
})


function modalPaymentOpen() { 
    modal_payment.classList.add('modal__open')
    document.body.style.overflow = 'hidden'
}

function modalDeliveryOpen() {
    modal_delivery.classList.add('modal__open')
    document.body.style.overflow = 'hidden'
}

function modalClose(e) {
    if(e.target.closest('.modal__container-close') || !e.target.closest('.modal__container')) { 
        this.classList.remove('modal__open')
        document.body.style.overflow = 'auto'
    }
}
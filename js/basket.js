const [stock, stockDisable] = document.body.querySelectorAll('.stock');
const stockButton = stock.querySelector('.stock__button')
const stockDisableButton = stockDisable.querySelector('.stock__button')
const stcokContainer = stock.querySelector('.stock__container')
const stcokDisableContainer = stockDisable.querySelector('.stock__container')
const checkbox = stock.querySelector('.stock__checkbox')
const stockInfo = stock.querySelector('.stock__info-in-dis')
const checkboxAll = stock.querySelector('#selectAll')
const products = stcokContainer.querySelectorAll('.product')
const checkboxes = Array.from(products).map(elem => elem.querySelector('.product__img-select>input'))

checkboxes.forEach(elem => {
    elem.addEventListener('change', (e) => {
        if(e.target.checked) {
            if(!checkboxes.find(item => item.checked === false)) {
                checkboxAll.checked = true
            }
        } else {
            checkboxAll.checked = false
        }
    })
})

products.forEach(product => {
    product.addEventListener('click', function(e) {
        const elem = e.target
        if(elem.closest('.product__handling-minus')) {
            const amount = this.querySelector('.product__count')
            amount.textContent -= 1
            this.querySelector('.product__handling-plus').disabled = false
            if(amount.textContent === '1') elem.disabled = true
        }
        if(elem.closest('.product__handling-plus')) {
            const amount = this.querySelector('.product__count')
            const maxValue = this.querySelector('.product__limit')?.textContent
            amount.textContent = +amount.textContent+1
            this.querySelector('.product__handling-minus').disabled = false
            if(amount.textContent === maxValue) elem.disabled = true
        }
        if(elem.closest('.product__state-delete')) this.remove()
    })
})


stockButton.addEventListener('click', () => {
    stcokContainer.classList.toggle('stock__container-disabled')
    stockButton.classList.toggle('stock__button-rotate')
    stock.classList.toggle('stock__mrb-16')
    checkbox.classList.toggle('stock__panel-elem-close')
    stockInfo.classList.toggle('stock__panel-elem-close')
})

stockDisableButton.addEventListener('click', () => {
    stcokDisableContainer.classList.toggle('stock__container-disabled')
    stockDisableButton.classList.toggle('stock__button-rotate')
})

checkboxAll.addEventListener('change', (e) => {
    if(e.target.checked) {
        checkboxes.forEach(item => item.checked = true)
    } else {
        checkboxes.forEach(item => item.checked = false)
    }
})
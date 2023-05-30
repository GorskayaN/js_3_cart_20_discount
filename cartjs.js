const formatNumber = (x) => x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '')

const totalPriceWrapper = document.getElementById('total-price')
const ACTION = {
  PLUS: 'plus',
  MINUS: 'minus',
}

const getItemSubTotalPrice = (input) => Number(input.value) * Number(input.dataset.price)

const setTotalPrice = (value) => {
  totalPriceWrapper.textContent = formatNumber(value)
  totalPriceWrapper.dataset.value = value
}

const init = () => {
  let totalCost = 0

  ;[...document.querySelectorAll('.basket__item')].forEach((basketItem) => {
    totalCost += getItemSubTotalPrice(basketItem.querySelector('.input'))
  })

  setTotalPrice(totalCost)
}

const calculateSeparateItem = (basketItem, action) => {
  const input = basketItem.querySelector('.input')
  switch (action) {
    case ACTION.PLUS:
      input.value++
      setTotalPrice(Number(totalPriceWrapper.dataset.value) + Number(input.dataset.price))
      break
    case ACTION.MINUS:
      input.value--
      setTotalPrice(Number(totalPriceWrapper.dataset.value) - Number(input.dataset.price))
      break
  }
  basketItem.querySelector('.subtotal').textContent = `${formatNumber(
    getItemSubTotalPrice(input)
  )} руб.`
}

document.getElementById('basket').addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-minus')) {
    const input = event.target.closest('.basket__item').querySelector('.input')

    if (Number(input.value) !== 0) {
      calculateSeparateItem(event.target.closest('.basket__item'), ACTION.MINUS)
    }
  }

  if (event.target.classList.contains('btn-plus')) {
    calculateSeparateItem(event.target.closest('.basket__item'), ACTION.PLUS)
  }
})

init()

const btnDiscount = document.querySelectorAll('.sl-discount')
//const btnDiscount = document.querySelectorAll('.sl-discount__button')

btnDiscount.addEventListener('click', function () {
  //console.log('btnDiscount')
})

// функция принимает два аргумента текущую цену и размер скидки
function setDiscount(price, discount = 20) {
  // вычисляем сумму скидки
  const discountAmount = (price * discount) / 100
  // из текущей цены вычитаем сумму скидки
  return price - discountAmount
}

//btnDiscount.onclick = function () {
//console.log('20')

function applyDiscount(price) {
  const discount = price * 0.2
  const discountedPrice = price - discount
  return discountedPrice
}

//const btnDiscount = document.querySelectorAll('.sl-discount__button')

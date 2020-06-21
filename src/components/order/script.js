import { Rest } from "../../modules/fetch"
import { saveOrderInfo } from '../../redux/cartReducer'

export function setSum(sum, product) {
    sum += (
        (
        product.product['price@' + product.color] ||
        product.product['price']
        ) * (
        100 - (
            product.product['sale@' + product.color] ||
            product.product['sale'] || 0
            )
        ) / 100
    ) * product.count
    return sum
}

export function handleOrder(e, cartProds, sum, auth) {
    e.preventDefault()
    let inputs = e.target.elements

    if (auth.timer > Date.now()) {
        
        let orderToSend = {
            cartProds,
            name: inputs.name.value,
            email: inputs.signEmail.value,
            tel: inputs.tel.value,
            delivery: inputs.delivery.value,
            sum,
            date: Date.now(),
            status: 'new',
            usersComment: inputs.comment.value,
            userId: auth.id
        }
        Rest.new(orderToSend, "orders", auth.idToken)
        .then(response => response.json())
        .then(result => {
            if (result.error) handleError(inputs, result.error)
            else {
                inputs.postOrder.innerText = "Заказ отправлен"
                sessionStorage.cartProds = []
                sessionStorage.orderInfo = []
            }
        })
    }
    else handleError(inputs, "Войдите чтобы продолжить")
}

function handleError(inputs, error) {
    console.log(error)
    if (error !== "Войдите чтобы продолжить") {
        error = "Что-то пошло не так"
    }
    inputs.postOrder.innerText = error
    inputs.postOrder.style.color = 'red'
}

export function listenForms(dispatch) {
    if (document.forms.length)
    for (let i=0; i<5; i++) {
        document.forms.tosend.elements[i]
        .addEventListener('change', (e) => {
            dispatch(saveOrderInfo(e))
        })
    }
}
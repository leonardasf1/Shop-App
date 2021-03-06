import { Rest } from "../../modules/fetch"
import { saveOrderInfo, clearOrderState } from '../../redux/cartReducer'

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

const a_login = '<a href="#login">Войдите чтобы продолжить</a>'

export function handleOrder(e, cartProds, sum, auth, dispatch) {
    e.preventDefault()
    let inputs = e.target.elements
    inputs.postOrder.disabled = true

    if (auth.timer > Date.now()) {
        
        let orderToSend = {
            cartProds,
            name: inputs.name.value,
            email: inputs.signEmail.value,
            tel: inputs.tel.value,
            delivery: inputs.delivery.value,
            sum,
            date: Date.now(),
            number: new Date(Date.now())
            .toLocaleDateString('ko-KR', {year: '2-digit', month: '2-digit', day: '2-digit'})
            .replace(". ", "").replace(". ", ""),
            status: 'new',
            usersComment: inputs.comment.value,
            userId: auth.id
        }
        Rest.new(orderToSend, "orders", auth.idToken)
        .then(response => response.json())
        .then(result => {
            if (result.error) handleError(inputs, result.error)
            else {
                inputs.postOrder.innerText = `Заказ ${orderToSend.number + result.name.substr(-3)} отправлен`
                dispatch(clearOrderState())
                sessionStorage.cartProds = []
                sessionStorage.orderInfo = []
            }
        })
    }
    else handleError(inputs, a_login)
}

function handleError(inputs, error) {
    console.log(error)
    if (error !== a_login) {
        error = "Что-то пошло не так"
    }
    inputs.postOrder.innerHTML = error
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

export function updateOrder(e, originOrder, sum, auth) {
    e.preventDefault()
    let inputs = e.target.elements
    inputs.postAdminOrder.disabled = true

    if (auth.timer > Date.now()) {
        
        let orderToSend = {
            cartProds: originOrder.cartProds,
            name: inputs.name.value,
            email: inputs.signEmail.value,
            tel: inputs.tel.value,
            delivery: inputs.delivery.value,
            sum,
            date: originOrder.date,
            number: originOrder.number,
            status: inputs.status.value,
            usersComment: originOrder.usersComment,
            userId: originOrder.userId,
            adminComment: inputs.adminComment.value,
            adminId: auth.id
        }
        Rest.update(orderToSend, "orders", originOrder.id, auth.idToken)
        .then(response => response.json())
        .then(result => {
            if (result.error) handleError(inputs, result.error)
            else {
                inputs.postAdminOrder.innerText = `Заказ ${orderToSend.number + originOrder.id.substr(-3)} изменён`
            }
        })
    }
    else handleError(inputs, a_login)
}

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOrders } from '../../redux/appReducer'
import { Rest } from '../../modules/fetch'

export default function User(props) {

    const dispatch = useDispatch()

    useEffect(() => { getOrdersByUser() },[])

    return (
        <div>
            <h2>Личный кабинет</h2>
            <ul>
                <li>Имя: {props.auth.name}</li>
                <li>Email: {props.auth.email}</li>
                <li>Телефон: {props.auth.tel}</li>
            </ul>
            
            <div className="orderList">
                <h3>Список заказов</h3>
                <table><tbody>
                {props.orders.length > 0 &&
                props.orders.map((order, index) => {
                    return (
                    <tr key={index} className="orderForList">
                        <td>
                            <a href={`#userorder/${order.id}`}>
                                {order.number + order.id.substr(-3)}
                            </a>
                        </td>
                        <td className="orderForList-product">{order.cartProds[0].product.title}</td>
                        <td>{order.status}</td>
                        <td>{order.sum} руб</td>
                    </tr>)
                })}
                </tbody></table>
            </div>
            <div>
                <h3>Ваши отзывы</h3>
                {/* userRewiews */}
            </div>
        </div>
    )

    function getOrdersByUser() {
        if (props.auth.timer > Date.now()) {
            Rest.getFilteredItems(
                "orders", props.auth.idToken,
                "email", props.auth.email, 100)
            .then(json => {
                if (json === null) document.querySelector('.orderList').innerHTML = `
                <h3>Нет заказов</h3>`
                else if (json.error) console.log(json.error)
                else {
                    dispatch(setOrders(json))
                }
            })
        }
    }
    
}

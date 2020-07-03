import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOrders } from '../../redux/appReducer'
import { Rest } from '../../modules/fetch'

let check = false

export default function OrderList(props) {

    const dispatch = useDispatch()

    useEffect(() => { fetchOrders() },[])

    return (
    <div className="orderList">
        <table>
            <thead>
                <tr>
                    <td>
                        <input type="date" onChange={getOrdersByDate} />
                        <button onClick={fetchOrders}>сброс</button>
                    </td>
                    <td>
                        <input placeholder="email"
                        onBlur={getOrdersByEmail}
                        onChange={() => check = true} />
                    </td>
                    <td>
                        <select name="status" id="status"
                            onChange={getOrdersByStatus}
                            >
                            <option value="">Все</option>
                            <option value="new">Новый</option>
                            <option value="processing">В обработке</option>
                            <option value="confirmed">Подтвержден</option>
                            <option value="done">Выполнен</option>
                        </select>
                    </td>
                    <td>Сумма</td>
                    <td>Доставка</td>
                </tr>
            </thead>
            <tbody>

            {props.orders.length > 0 &&
            props.orders.map((order, index) => {
                return (
                <tr key={index} className="orderForList">
                    <td>
                        <a href={`#adminorder/${order.id}`}>
{order.number + order.id.substr(-3)} / {new Date(order.date).toLocaleTimeString()}
                        </a>
                    </td>
                    <td>{order.email}</td>
                    <td>{order.status}</td>
                    <td>{order.sum} руб</td>
                    <td>{order.delivery}</td>
                </tr>)
            })}
            {props.orders.length === 0 &&
            <h3>Нет заказов</h3>}
            </tbody>
        </table>
    </div>)

    function fetchOrders() {
        if (props.auth.timer > Date.now()) {
            Rest.getOrders(props.auth.idToken)
            .then(json => {
                if (json.error) console.log(json.error)
                else {
                    dispatch(setOrders(json))
                }
            })
        }
    }
    function getOrdersByStatus(e) {
        getFilteredOrders("status", e.target.value)
    }
    function getOrdersByEmail(e) {
        if (check)
        getFilteredOrders("email", e.target.value)
        check = false
    }
    function getOrdersByDate(e) {
        // console.log(e.target.value.substr(2).replace("-","").replace("-",". ").concat("."))
        getFilteredOrders("number", e.target.value.substr(2).replace("-","").replace("-","").concat("."))
    }
    function getFilteredOrders(orderBy, equalTo) {
        if (!equalTo) fetchOrders()
        else if (props.auth.timer > Date.now()) {
            Rest.getFilteredItems(
                "orders", props.auth.idToken,
                orderBy, equalTo, 100)
            .then(json => {
                if (json === null) dispatch(setOrders({}))
                else if (json.error) console.log(json.error)
                else {
                    dispatch(setOrders(json))
                }
            })
        }
    }
    
}

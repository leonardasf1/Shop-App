import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOrders } from '../../redux/appReducer'
import { Rest } from '../../modules/fetch'

export default function OrderList(props) {

    const dispatch = useDispatch()

    useEffect(() => { fetchOrders() },[])

    function fetchOrders() {

        Rest.getOrders(props.auth.idToken)
        .then(json => {
            if (json.error) console.log(json.error)
            else {
                dispatch(setOrders(json))
            }
        })
    }
    
    return (
        <table>
            <thead>
                <tr>
                    <td>Дата</td>
                    <td>email</td>
                    <td></td>
                    <td>Статус</td>
                    <td>Сумма</td>
                    <td>Доставка</td>
                </tr>
            </thead>
            <tbody>

            {props.orders.length > 0 &&
            props.orders.map((order, index) => {
                return (
                <tr key={index}>
                    <td>
{new Date(order.date).toLocaleDateString()} / {new Date(order.date).toLocaleTimeString()}
                    </td>
                    <td>{order.email}</td>
                    <td>
                        <a href={`#adminorder/${order.id}`}>
                            <button>Открыть</button>
                        </a>
                    </td>
                    <td>{order.status}</td>
                    <td>{order.sum} руб</td>
                    <td>{order.delivery}</td>
                </tr>)
            })}

            </tbody>
        </table>
    )
}

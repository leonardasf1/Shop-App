import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setOrders } from '../../redux/appReducer'
import { Rest } from '../../modules/fetch'

export default function User(props) {

    const dispatch = useDispatch()

    useEffect(() => { fetchUserOrders() },[])

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
                {props.orders.length > 0 &&
                props.orders.map((order, index) => {
                    return (
                    <div key={index} className="orderForList">
    <div>{order.number + order.id.substr(-3)}</div>

    <div><a href={`#userorder/${order.id}`}><button>Открыть</button></a></div>

    <div>{order.status}</div>

    <div>{order.sum} руб</div>
                    </div>)
                })}
            </div>
            <div>
                <h3>Ваши отзывы</h3>
                {/* userRewiews */}
            </div>
        </div>
    )



    function fetchUserOrders() {
        if (props.auth.timer > Date.now()) {
            Rest.getUserOrders(props.auth.idToken, props.auth.email)
            .then(json => {
                if (json.error) console.log(json.error)
                else {
                    dispatch(setOrders(json))
                }
            })
        }
    }
    
}
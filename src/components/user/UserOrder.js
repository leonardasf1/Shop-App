import React from 'react'
import Order from '../order/Order'

export default function UserOrder(props) {
    let orderInfo = [{
        "name": props.order.name,
        "email": props.order.email,
        "delivery": props.order.delivery,
        "tel": props.order.tel,
        "comment": props.order.comment,
        "date": props.order.date,
        "orderId": props.order.id,
        "status": props.order.status,
        "number": props.order.number
    }]
    return (
        <Order
            auth={props.auth}
            cartProds={props.order.cartProds}
            orderInfo={orderInfo}
         />
    )
}

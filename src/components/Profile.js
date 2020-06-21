import React from 'react'

export default function Profile(props) {
    return (
        <div>
            <h2>Личный кабинет</h2>
            <ul>
                <li>Имя: {props.auth.name}</li>
                <li>Email: {props.auth.email}</li>
                <li>Телефон: {props.auth.tel}</li>
            </ul>
            
            <div>
                <h3>Список заказов</h3>
                {/* userOrders */}
            </div>
            <div>
                <h3>Ваши отзывы</h3>
                {/* userRewiews */}
            </div>
        </div>
    )
}
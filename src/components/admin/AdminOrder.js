import React from 'react'
import OrderProduct from '../order/OrderProduct';
import { useDispatch } from 'react-redux';
// import { saveOrderInfo } from '../../redux/';

export default function AdminOrder(props) {

    let sum = 0;
    // const dispatch = useDispatch()

    return (
    <div className="orderComponent">
        <div className="cartForm">
            <h2>Заказ</h2>

            <div>
            { props.order.cartProds.map((product, index) => {

                sum += (
                    (
                    product.product['price@' + product.color] ||
                    product.product.price
                    ) * (
                    100 - (
                        product.product['sale@' + product.color] ||
                        product.product.sale
                        )
                    ) / 100
                ) * product.count

                return <OrderProduct
                            key={index}
                            product={product}
                            index={index}
                        />
            })}</div>

            <div>
                <span>Стоимость товаров: {sum} руб</span><br />
                <span>Доставка: {props.order.delivery ? 'от 300' : '0'} руб</span><br />
                <span>Итого: {props.order.delivery ? 'от ' : ''}
                    <b>{(props.order.delivery ? 300 : 0) + sum} руб</b>
                    (<b>{props.order.sum}</b>)
                </span><br />
            </div>
        </div>

        <div className="orderForm">
            <h2>Данные покупателя</h2>
            <div>
            <form id="tosend" className="form"
                // onSubmit={(e) => handleOrder(e, props.order.cartProds, sum, props.auth)}
            >
            <div>
                <div className="textfield--float-label">
                    <span className="error"></span>
                    <input type="text" required name="name" id="name"
                        defaultValue={props.order.name} />
                    <label>Имя</label>
                </div>
                <div className="textfield--float-label">
                    <span className="error"></span>
                    <input type="email" required name="email" id="signEmail"
                        defaultValue={props.order.email} />
                    <label>Электронный адрес</label>
                </div>
                <div className="textfield--float-label">
                    <span className="error"></span>
                    <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" name="tel" id="tel"
                        defaultValue={props.order.tel} />
                    <label>Номер мобильного телефона</label>
                </div>
                <div className="textfield--float-label">
                    <input type="text" name="delivery" id="delivery"
                        // onBlur={(e) => {
                        //     dispatch(deliveryState(!!e.target.value))
                        // }}
                        defaultValue={props.order.delivery} />
                    <label>Адрес доставки если нужна доставка</label>
                </div>
                <div className="textfield--float-label">
                    <textarea type="text" rows="5" name="comment" disabled
                        defaultValue={props.order.usersComment} />
                    <label>Комментарий покупателя</label>
                </div>
                <div className="textfield--float-label">
                    <textarea type="text" rows="5" name="comment"
                        defaultValue={props.order.managersComment} />
                    <label>Комментарий менеджера</label>
                </div>
                <div className="textfield--float-label">
                    <select name="status" id="status"
                        defaultValue={props.order.status}>
                        <option value="new">Новый</option>
                        <option value="processing">В обработке</option>
                        <option value="confirmed">Подтвержден</option>
                        <option value="done">Выполнен</option>
                    </select>
                    <label>Статус заказа</label>
                </div>
            </div>
            <div className="form__comment">
                <button type="submit" id="postAdminOrder">Сохранить изменения</button>
            </div>
            </form>
            </div>
        </div>
    </div>
    )
}

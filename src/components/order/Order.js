import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './style.scss'
import OrderProduct from './OrderProduct'
import { handleOrder, setSum, listenForms } from './script'

export default function Order(props) {
    const dispatch = useDispatch()

    let sum = 0
    let delivery = props.orderInfo.length ? props.orderInfo[0].delivery : false
    let orderInfo = props.orderInfo[0] || {
            "name": '',
            "email": '',
            "delivery": '',
            "tel": '',
            "comment": ''
        }

    let page1 = (
    <div className="orderComponent">
        <div className="cartForm">
            <h2>{orderInfo.number ? `Заказ ${orderInfo.number + orderInfo.orderId.substr(-3)}` : "Корзина"}</h2>

            <div>
            { props.cartProds.map((product, index) => {
                sum = setSum(sum, product)
                return <OrderProduct
                            key={index}
                            product={product}
                            index={index}
                        />
            })}</div>

            <div>
                <span>Стоимость товаров: {sum} руб</span><br />
                <span>Доставка: {delivery ? 'от 300' : '0'} руб</span><br />
                <span>Итого: {delivery ? 'от ' : ''}
                    <b>{(delivery ? 300 : 0) + sum} руб</b>
                </span><br />
            </div>
        </div>
        
        <div className="orderForm">
        {orderInfo.number ? "" : <h2>Оформление заказа</h2>}
            <div>
            <form id="tosend" className="form"
                onSubmit={(e) => {
                    if (!orderInfo.number) handleOrder(e, props.cartProds, sum, props.auth, dispatch)
                    if (orderInfo.number) e.preventDefault()
                }}>
            <div>
                <div className="textfield--float-label">
                    <span className="error"></span>
                    <input type="text" required name="name" id="name"
                        defaultValue={orderInfo.name || props.auth.name} />
                    <label>Имя</label>
                </div>
                <div className="textfield--float-label">
                    <span className="error"></span>
                    <input type="email" required name="email" id="signEmail"
                        defaultValue={orderInfo.email || props.auth.email}
                     />
                    <label>Электронный адрес</label>
                </div>
                <div className="textfield--float-label">
                    <span className="error"></span>
                    <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" name="tel" id="tel"
                        defaultValue={orderInfo.tel || props.auth.tel} />
                    <label>Номер мобильного телефона</label>
                </div>
                <div className="textfield--float-label">
                    <span className="error"></span>
                    <input type="text" name="delivery" id="delivery"
                        defaultValue={orderInfo.delivery} />
                    <label>Адрес доставки если нужна доставка</label>
                </div>
                <div className="textfield--float-label">
                    <textarea type="text" rows="5" name="comment" id="comment"
                        defaultValue={orderInfo.comment} />
                    <label>Комментарий</label>
                </div>
            </div>
            <div className="form__comment">
                <button type="submit" id="postOrder">
                    {orderInfo.number ? "Пока нельзя изменить" : "Отправить заказ"}
                </button>

                { (!props.auth || props.auth.timer < Date.now()) &&
                <div>Для оформления заказа необходимо <a href="#auth" id="a_login">Войти</a></div>
                }
                
            </div>
            </form>
            </div>
        </div>
    </div>
    )

    let page2 = (
        <div className="order-emptyCart">
            <img />
            <h3>В вашей корзине нет товаров</h3>
        </div>
    )
    let page = props.cartProds.length ? page1 : page2

    useEffect(() => {
        window.scroll(0, 0)
        listenForms(dispatch)
    }, [])
    
    return page
}

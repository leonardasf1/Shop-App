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
            <h2>Корзина</h2>

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
            <h2>Оформление заказа</h2>
            <div>
            <form id="tosend" className="form"
                onSubmit={(e) => handleOrder(e, props.cartProds, sum, props.auth)}>
            <div>
                <div className="textfield--float-label">
                    <span className="error"></span>
                    <input type="text" required name="name" id="name"
                        defaultValue={orderInfo.name} />
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
                        defaultValue={orderInfo.tel} />
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
                <button type="submit" id="postOrder">Отправить заказ</button>
                <div>Уже есть аккаунт? <a href="#login" id="a_login">Войти</a></div>
                Нажимая кнопку «Отправить заказ»:
                <div>
                <input name="agreement" type="checkbox" required defaultChecked />
                Я принимаю <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Условия использования</a> и даю своё согласие на обработку моей персональной информации на условиях, определенных <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Политикой конфиденциальности</a>.
                </div>
            </div>
            </form>
            </div>
        </div>
    </div>
    )

    let page2 = (
        <div className="order-emptyCart">
            <span>&#128722;</span>
            <h3>В вашей корзине нет товаров</h3>
        </div>
    )
    let page = props.cartProds.length ? page1 : page2

    useEffect(() => {
        window.scroll(0, 0)
        listenForms(dispatch, props.orderInfo)
    }, [])
    
    return page
}

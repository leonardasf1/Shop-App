import React from 'react'
import { useDispatch } from 'react-redux'
import {
    deleteFromCart,
    changeProdCount,
    countPlus,
    countMinus
} from '../../redux/cartReducer'
import close from '../../assets/close.svg'

export default function OrderProduct(props) {
    const dispatch = useDispatch()
    const color = props.product.color
    const product = props.product.product

    return (
        <li>
            <div className="removeIcon" onClick={() => 
            dispatch(deleteFromCart(props.product))}><img src={close} /></div>
            <a
                href={`#product/${product.id}`}
                className="img">
                <img
                    src={product['img54@' + color]}
                    alt={product['color@' + color]} />
            </a>
            <span className="title">{product.title.substr(0,40)}...</span>
            <br />
            <span className="article">Арт.: {product.article}</span>
            <br />
            <span>Цвет: {product['color@' + color]}</span>
            <span>, Размер: {props.product.size}</span>
            <br />
            <div>
                <div className="countMinus"
                    onClick={() => 
                        dispatch(countMinus(props.product.id))}
                >-</div>
                <input
                    className="count"
                    type="text" maxLength="3"
                    value={props.product.count}
                    onChange={(e) => 
                        dispatch(changeProdCount(props.product.id, e.target.value))}
                />
                <div className="countPlus"
                    onClick={() => 
                        dispatch(countPlus(props.product.id))}
                >+</div>
            </div>
            <span className="available">Доступно {props.product.availableCount}</span>
            <span className="price">
                {(product['price@' + color] || product.price) *
                (100 - (product['sale@' + color] || product.sale || 0)) / 100} руб
            </span><br />
        </li>
    )
}

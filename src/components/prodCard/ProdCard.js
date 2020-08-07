import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import './style.scss'
import ProdConnected from '../ProdConnected';
import Rewiews from '../Rewiews';
import {
    prodSize,
    availableCount,
    setSpecs,
    clearChoice,
    setColors,
    setProdColor,
    setProdForCart,
    fetchSeparateProd } from './script';

export default function ProdCard(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        fetchSeparateProd(dispatch, props.productId)
        window.scroll(0, 0)
    },[props.productId])

    let product = props.product || {}

    let page = (
        <div className="prodCard">
            <div className="prodCard_block1">

            {props.auth && props.auth.status === 'admin' &&
            props.auth.timer > Date.now() &&
            <a href={'#admin/' + product.id} className="error">Изменить</a>
            } {/* исправить */}

                <div className="prodCard_block1_img">
                    <div className="sale">{product.sale && `-${product.sale}%`}</div>
                    <img src={product.img} alt="" />
                </div>

                <div className="prodCard_block1_info">
                    <h3>{product.brand}</h3>
                    <h2>{product.title}</h2>
                    Артикул: <b>{product.article}</b>
                    <hr />
                    <span className="sex">Пол: <b>{product.sex}</b></span>

                    <div>
                        <span>Цвет: <b className="color">
                            {product['color@0']}</b>
                        </span>
                        <div className="divImg54" id="prodColors">
                        {setColors(product).map( (i, index) =>
                            <img
                            key={i}
                            alt={i}
                            src={ product['img54@' + index] }
                            onClick={(e) => setProdColor(e, i, index)}
                            />
                        )}
                        </div>
                    </div>
                    <span>Размер: </span>
                        <span className="size"></span>
                    <hr />
                    <div>
                        <div className="divPrice">
                        <b className="price">
{product.sale ? product.price * (100 - product.sale) / 100 : product.price}
                        </b>
                        <sup> руб</sup>
                        <s>{product.sale && product.price + " ₽"}</s>

                        </div>
                        <button
                        className="buy"
                        onClick={() => {
                            clearChoice('.divImg54 > img')
                            clearChoice('.size > div')
                            setProdForCart(
                                dispatch,
                                props.cartProds,
                                prodSize,
                                availableCount
                                )
                            }}
                        ><b>купить</b></button>
                        <div className="availableCount">В наличии</div>
                    </div>
                </div>
            </div>

            <div className="prodCard_block2">

                <p>{product.description}</p>
                <span>Характеристики:</span>
                <ul>
                    {setSpecs().map( (i,index) =>
                        <li className="specLi" key={index}>
                            <span>{i.split(':')[0]}:</span>
                            <span> {i.split(':')[1]}</span>
                        </li>
                    )}
                </ul>
                <Rewiews
                    auth={props.auth}
                    productId={props.productId}
                    rewiews={props.rewiews} />
            </div>
        </div>
    )

    return (
        <div>
            {page}
            <ProdConnected />
        </div>
    )
}
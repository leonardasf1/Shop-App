import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import './style.scss'
import ProdConnected from '../ProdConnected';
import Rewiews from '../Rewiews';
import {
    setSpecs,
    clearChoice,
    setColors,
    setProdForCart,
    fetchSeparateProd } from './script';

export default function ProdCard(props) {
    const dispatch = useDispatch()

    useEffect(() => { fetchSeparateProd(dispatch, props.productId) },[props.productId])

    let product = props.product || {}
    let prodColor = '0'
    let prodSize = 'не выбран'

    let page = (
        <div className="prodCard">
            <div className="prodCard_block1">

            {props.authEmail === 'admin' &&
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
                        <div className="divImg54">
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
                        </div>
                        <button
                        className="buy"
                        onClick={() => {
                            clearChoice('.divImg54 > img')
                            clearChoice('.size > div')
                            setProdForCart(
                                dispatch,
                                product,
                                props.cartProds,
                                prodColor,
                                prodSize
                                )
                            // dispatch(addToCart(
                            //     product,
                            //     props.cartProds,
                            //     prodColor,
                            //     prodSize
                            //     ))
                            }}
                        ><b>купить</b></button>
                    </div>
                    <s>{product.sale && product.price + " ₽"}</s>
                </div>
            </div>

            <div className="prodCard_block2">

                <p>{product.description}</p>
                <span>Характеристики:</span>
                <ul>
                    {setSpecs(product).map( (i,index) => 
                        <li className="specLi" key={index}>
                            <span>{i.split(':')[0]}:</span>
                            <span> {i.split(':')[1]}</span>
                        </li>
                    )}
                </ul>
                <Rewiews />
            </div>
        </div>
    )

    return (
        <div>
            {page}
            <ProdConnected />
        </div>
    )

    function setProdSize(e) {
        prodSize = e.target.textContent
        clearChoice('.size > div')
        e.target.style.borderColor = "#00adee"
    }
    
    function setProdColor(e, color, colorIndex) {
        prodColor = colorIndex
        clearChoice('.divImg54 > img')
        e.target.style.borderColor = "#00adee"
        document.querySelector('.color').innerText = color
        
        document.querySelector('.price').innerText =
        (product['price@' + colorIndex] || product.price) *
        (100 - (product['sale@' + colorIndex] || product.sale || 0)) / 100
    
        let sizes = []
        let prev = ''
        product['size@' + colorIndex].split(',').map(i => {
            if (i.split('-')[0].trim() !== prev) sizes.push(
                `<div>${i.split('-')[0].trim()}</div>`
                )
            prev = i.split('-')[0].trim()
        })
        document.querySelector('.size').innerHTML = sizes.join('')
        document.querySelectorAll('.size > div').forEach(div => {
            div.addEventListener('click', setProdSize)
        });
    }
}
//наличие
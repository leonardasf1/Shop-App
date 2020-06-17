import React from 'react'
import { addField,
    addProdColor,
    setNewProduct } from './script'

export default function Admin(props) {

    let savedProduct = sessionStorage.newProduct &&
            JSON.parse(sessionStorage.newProduct)

    if (props.prod) savedProduct = props.prod

    const fieldList = [
        "article",
        "title",
        "brand",
        "img",
        "img200",
        "img54",
        "price",
        "sale",
        "categ",
        "sex"
    ]
    const colorFieldList = [
        "color",
        "img",
        "img200",
        "img54",
        "price",
        "sale",
        "size"
    ]

    const formHTML = (
<div className="product-form">
    <form id="form">

        {
        fieldList.map(i => 
        <div className="textfield--float-label" key={i}>
            <input type="text" required
            defaultValue={
                savedProduct !== undefined ?
                savedProduct[i] : ''} />
            <label>{i}</label>
        </div>
        )}

        <div className="textfield--float-label">
            <textarea
            type="text"
            id="article-text-input"
            required
            rows="11"
            defaultValue={
                savedProduct !== undefined ?
                savedProduct["description"] : ''} />
            <label>description</label>
        </div>

        <div className="textfield--float-label">
            Характеристики:
            <ul><button onClick={(e) =>
                addField(e, savedProduct)
            }>+</button></ul>
        </div>

        <div>
            Наличие:
            <div>{colorFieldList.map(i => 
                <div className="textfield--float-label" key={i + '@0'}>
                    <input type="text"
                    defaultValue={
                        savedProduct !== undefined ?
                        savedProduct[i + '@0'] : ''} />
                    <label>{i + '@0'}</label>
                </div>
                )}
            </div>
            <button onClick={(e) =>
                addProdColor(e, colorFieldList, savedProduct)
            }>+</button>
        </div>

        <button
        id="submit" type="submit"
        className="mui-btn"
        onClick={(e) => setNewProduct(
            e, props.auth,
            props.prod && props.prod.id,
            props.newIndex)}
        > Опубликовать</button>

        <div className="error" id="error"></div>

    </form>
</div>
    )
    //изменить после настройки
    return (
        <div>
            {props.auth.email !== "admin" && formHTML }
        </div>
    )
}

import React from 'react'
import { addField,
    addProdColor,
    setNewProduct } from './script'
import { setColors } from '../prodCard/script'
import './style.css'

export default function Admin(props) {

    let savedProduct = sessionStorage.newProduct &&
            JSON.parse(sessionStorage.newProduct)

    if (props.prod) savedProduct = props.prod

    const fieldList = [
        "title",
        "img200",
        "article",
        "brand",
        "price",
        "sale",
        "categ",
        "sex"
    ]
    const colorFieldList = [
        "color",
        "img",
        "img54",
        "price",
        "sale",
        "size"
    ]
    let countSpec = 1
    let countSpecArr = new Array();
    (() => {
        while (savedProduct["spec" + countSpec]) {
          countSpecArr.push(countSpec)
          countSpec ++
        }
        countSpec--
    })();
    let countColor = 0

    function addProdColor(e) {

        e.preventDefault()
        countColor ++

        let ul = document.createElement('div')
        ul.classList.add("colorFieldList")

        e.target.parentNode.insertBefore(
            ul, e.target
        )
        colorFieldList.map(i => 
            e.target.previousElementSibling
            .insertAdjacentHTML('beforeend', `
            <div class="textfield--float-label">
                <input type="text" defaultValue="">
                <label>${i + '@' + countColor}</label>
            </div>`)
        )
    }

    const formHTML = (
<div className="product-form">

    <form id="form">

        {
        fieldList.map(i => 
        <div className={"textfield--float-label field-"+i} key={i}>
            <input type="text" required
            defaultValue={
                savedProduct !== undefined ?
                savedProduct[i] : ''} />
            <label>{i}</label>
        </div>
        )}

        <div className="textfield--float-label field-description">
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

        <div className="textfield--float-label" id="specs">
            Характеристики:
            <ul>{countSpecArr.map(i => 
              <li className="textfield--float-label" key={"spec" + i}>
                <input type="text" defaultValue={
                    savedProduct["spec" + i]
                } />
                <label>{'spec' + i}</label>
              </li>)}
              <button onClick={(e) => {
                  e.preventDefault()
                  countSpec ++
                  e.target.insertAdjacentHTML('beforebegin', `
                <li class="textfield--float-label" key="spec${countSpec}">
                  <input type="text">
                  <label>spec${countSpec}</label>
                </li>`)
              }}>+ добавить характеристику</button>
            </ul>
        </div>

        <div>
            <h3>Наличие цвета и размера:</h3> 
            {setColors(savedProduct).map( (item, index) =>
                
            <div className="colorFieldList" key={index}>
                {colorFieldList.map(i => 
                <div className={"textfield--float-label field-"+i} key={i + '@0'}>
                    <input type="text"
                    defaultValue={
                        savedProduct !== undefined ?
                        savedProduct[i + '@' + index] : ''} />
                    <label>{i + '@' + (countColor = index)}</label>
                </div>
                )}
            </div>
            )}
            <button onClick={(e) => addProdColor(e) }> + добавить цвет</button>
        </div>

        <button
        id="submit" type="submit"
        className="mui-btn"
        onClick={(e) => setNewProduct(
            e, props.auth,
            props.prod && savedProduct.id,
            props.prod && savedProduct.index,
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


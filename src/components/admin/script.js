import { Rest } from "../../modules/fetch"

// let countSpec = 1

// export function setSpecs(savedProduct) {
// console.log("setSpecs", countSpec, savedProduct["spec" + countSpec])
//     while (savedProduct["spec" + countSpec]) {
//         document.querySelector('#specs')
//          .insertAdjacentHTML('beforeend', `
//       <li class="textfield--float-label">
//         <input type="text" value="${
//             savedProduct["spec" + countSpec]
//         }">
//         <label>spec${countSpec}</label>
//       </li>`)
//         console.log(countSpec)
//         countSpec ++
//     }
//     countSpec--
// }
// export function addField(e, countSpec) {
//     e.preventDefault()
//     countSpec ++
//     e.target.insertAdjacentHTML('beforebegin', `
//   <li class="textfield--float-label">
//     <input type="text">
//     <label>spec${countSpec}</label>
//   </li>`)
// }
// export function addField(e, savedProduct) {
//     e.preventDefault()
//     countSpec ++
//     e.target.parentNode.insertAdjacentHTML('beforeend', `
//   <li class="textfield--float-label">
//     <input type="text" value="${
//         savedProduct !== undefined && savedProduct["spec" + countSpec] ?
//         savedProduct["spec" + countSpec] : ''
//     }">
//     <label>spec${countSpec}</label>
//   </li>`)
// }

let countColor = 0

export function addProdColor(e, colorFieldList, savedProduct) {

    e.preventDefault()
    countColor ++

    let ul = document.createElement('div')

    ul.innerText = 'цвет' + countColor

    e.target.parentNode.insertBefore(
        ul, e.target
    )
    colorFieldList.map(i => 
        e.target.previousElementSibling
        .insertAdjacentHTML('beforeend', `
        <div class="textfield--float-label">
            <input type="text" defaultValue="${
                savedProduct !== undefined && savedProduct[i + '@' + countColor] ?
                savedProduct[i + '@' + countColor] : ''
            }">
            <label>${i + '@' + countColor}</label>
        </div>`)
    )
}

// let newProduct = {};
// export function saveNewProductField(e) {
//     console.log(e.target.value)
//     newProduct[e.target.nextElementSibling.innerText] = e.target.value
//     sessionStorage.setItem("newProduct", JSON.stringify(newProduct))
// }

export function setNewProduct(e, auth, prodId, prodIndex, newIndex) {
    e.preventDefault()
    let inputs = e.target.parentNode.elements
    let newProduct = {};
    let eTarget = e.target

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].tagName !== "BUTTON" &&
            inputs[i].value) {
            newProduct[inputs[i].nextElementSibling.innerText] = inputs[i].value
        }
        if (inputs[i].tagName === "BUTTON") {
            inputs[i].disabled = true
        }
    }
    if (newIndex) {
        newProduct.index = newIndex
    } else {newProduct.index = +prodIndex}
    
    console.log(newProduct)
    
    if (auth.timer > Date.now()) {
        fetchRest(newProduct, prodId, auth.idToken)
        .then(response => response.json())
        .then(result => {
            if (result.error) problem(result.error, eTarget)
            else {
                sessionStorage.setItem("newProduct", "")
                if (!prodId) {
                    problem("Новый товар добавлен в базу", eTarget)
                } else { problem("Изменения сохранены в базу", eTarget) }
                
                // for (let i = 0; i < inputs.length; i++) {
                //     if(inputs[i].tagName !== "BUTTON") inputs[i].value = ''
                //     else inputs[i].disabled = false
                // }
                // Rest.getProductById(result.name)
                // .then(json => {
                    // getNewProds(json)
                    // window.location.hash = `#product/${result.name}`
                // })
            }
        })
    } else problem('', eTarget)

    // countSpec = 0
    countColor = 0

    function fetchRest(newProduct, prodId, idToken) {
        if (!prodId) {
            return Rest.new(newProduct, "products", idToken)
        }
        else return Rest.update(newProduct, "products", prodId, idToken)
    }

    function problem(error = '', eTarget) {
        sessionStorage.setItem("newProduct",
        JSON.stringify(newProduct)
        )
        eTarget.nextElementSibling.innerHTML = `
        Данные сохранены во временное хранилище, 
        ${ error ? error :
        'авторизуйтесь заново и вернитесь на эту страницу, чтобы добавить товар в базу'
        }`
    }
}
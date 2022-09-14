import { Rest } from "../../modules/fetch"

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
            }
        })
    } else problem('', eTarget)

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
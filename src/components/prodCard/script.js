import { addToCart } from "../../redux/cartReducer";
import { Rest } from '../../modules/fetch';
import { showLoader, showAlert, hideLoader } from '../../redux/actions';
import { setSeparateProds } from '../../redux/prodsReducer';

export function clearChoice(choice) {
    document.querySelectorAll(choice).forEach(i => {
        i.style.borderColor = "rgba(0,0,0,0)"
    });
}

export function setSpecs(product) {
    let specs = []
    for (let i = 1; ; i++) {
        if (!product['spec' + i]) break
        specs.push(product['spec' + i])
    }
    return specs
}

export function setColors(product) {
    let colors = []
    for (let i = 0; ; i++) {
        if (!product['color@' + i]) break
        colors.push(product['color@' + i])
    }
    return colors
}

export function setProdForCart(dispatch, product, cartProds, color, size, availableCount) {
    let prodForCart = {
        "id": product.id + "@" + color + "@" + size,
        "count": 1,
        product,
        color,
        size,
        availableCount
    }
    cartProds && cartProds.map(i => {
        if (i.id === prodForCart.id) {
            i.count++
            prodForCart.id = ''
        }
    })
    dispatch(addToCart(prodForCart, cartProds))
}

export function fetchSeparateProd(dispatch, productId) {
    dispatch(showLoader())
    Rest.getProductById(productId)
    .then(json => {
        if (json.error) dispatch(showAlert(json.error))
        else {
          dispatch(hideLoader())
          dispatch(setSeparateProds(json))
        }
    })
}
  
// export function setProdSize(e, prodSize) {
//     prodSize = e.target.textContent
//     clearChoice('.size > div')
//     e.target.style.borderColor = "#00adee"
// }

// export function setProdColor(e, color, colorIndex, prodColor, product, prodSize) {
//     prodColor = colorIndex
//     clearChoice('.divImg54 > img')
//     e.target.style.borderColor = "#00adee"
//     document.querySelector('.color').innerText = color
//     document.querySelector('.price')
//     .innerText = product['price@' + colorIndex] || product.price

//     let sizes = []
//     let prev = ''
//     product['size@' + colorIndex].split(',').map(i => {
//         if (i.split('-')[0].trim() !== prev) sizes.push(
//             `<div>${i.split('-')[0].trim()}</div>`
//             )
           
//         prev = i.split('-')[0].trim()
//     })
//     document.querySelector('.size').innerHTML = sizes.join('')
//     document.querySelectorAll('.size > div').forEach(div => {
//         div.addEventListener('click', (e) => setProdSize(e, prodSize))
//     });
// }

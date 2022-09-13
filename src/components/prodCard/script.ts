import { addToCart } from "../../redux/cartReducer";
import { Rest } from '../../modules/fetch';
import { showLoader, showAlert, hideLoader } from '../../redux/appReducer';
import { setSeparateProds, setRewiews } from '../../redux/prodsReducer';

interface Iproduct {
    [x: string]: any;
}

export let prodColor: string = '0'
export let prodSize: string = 'не выбран'
export let availableCount: number = 0
let product: Iproduct = {}

export function fetchSeparateProd(dispatch: any, productId: string): void {
    dispatch(showLoader())
    Rest.getProductById(productId)
        .then(json => {
            if (json.error) dispatch(showAlert(json.error))
            else {
                dispatch(hideLoader())
                dispatch(setSeparateProds(json))

                setProdColor(
                    q('#prodColors').firstElementChild,
                    setColors(product)[0], 0)
                setProdSize(
                    q('.size > div'))
            }
        })
    Rest.getRewiewsByProduct(productId)
        .then(json => {
            if (!json) dispatch(setRewiews([]))
            else dispatch(setRewiews(json))
        })
}

export function clearChoice(choice: string): void {
    document.querySelectorAll(choice).forEach((i: any) => {
        i.style.borderColor = "rgba(0,0,0,0)"
    });
}
export function setSpecs(): string[] {
    let specs: string[] = []
    for (let i = 1; ; i++) {
        if (!product['spec' + i]) break
        specs.push(product['spec' + i])
    }
    return specs
}

export function setColors(producT: Iproduct): string[] {
    product = producT
    let colors: string[] = []
    for (let i = 0; ; i++) {
        if (!product['color@' + i]) break
        colors.push(product['color@' + i])
    }
    return colors
}

export function setProdForCart(
    dispatch: (arg0: { type: string; payload: any; }) => void,
    cartProds: any[],
    // color: string,
    size: string,
    availableCount: number,
): void {
    let prodForCart = {
        "id": product.id + "@" + prodColor + "@" + size,
        "count": 1,
        product,
        "color": prodColor,
        size,
        availableCount
    }
    if (cartProds) {
        cartProds.forEach(i => {
            if (i.id === prodForCart.id) {
                i.count++
                prodForCart.id = ''
            }
        })
    }
    dispatch(addToCart(prodForCart, cartProds))
}

function q(id: string): any {
    return document.querySelector(id)
}
function setProdSize(e: any): void {
    clearChoice('.size > div')
    if ( e !== null && e.target ) {
        prodSize = e.target.textContent
        e.target.style.borderColor = "#00adee"
    } else {
        e.style.borderColor = "#00adee"
        prodSize = e.textContent
    }
    availableCount = 0
    let shopsCount: string[] = []
    product['size@' + prodColor].split(',').map((i: string) => {
        if (i.split('-')[0].trim() === prodSize) {
            shopsCount.push(
                `<div>Магазин №${i.split('-')[1].trim()} : ${i.split('-')[2].trim()}</div>`
            )
            availableCount += +(i.split('-')[2].trim())
        }
    })
    q('.availableCount').innerHTML = shopsCount.join('')
}

export function setProdColor(
    e: any,
    color: string,
    colorIndex: number
): void {
    prodColor = colorIndex.toString()
    clearChoice('.divImg54 > img')
    if ( e !== null && e.target ) {
        e.target.style.borderColor = "#00adee"
    } else e.style.borderColor = "#00adee"

    q('.color').innerText = color
    q('.prodCard_block1_img > img').src = `${ product['img@' + colorIndex] }`
    q('.availableCount').innerText = ''

    q('.price').innerText =
        (+product['price@' + colorIndex] || +product.price) *
        (100 - (+product['sale@' + colorIndex] || +product.sale || 0)) / 100

    let sizes: string[] = []
    let prev = ''
    product['size@' + colorIndex].split(',').map((i: string) => {
        if (i.split('-')[0].trim() !== prev) sizes.push(
            `<div>${i.split('-')[0].trim()}</div>`
        )
        prev = i.split('-')[0].trim()
    })

    q('.size').innerHTML = sizes.join('')
    document.querySelectorAll('.size > div').forEach(div => {
        div.addEventListener('click', setProdSize)
    });

}

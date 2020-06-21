import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Loader } from './Loader'
import {
  setLastProds,
  setMoreProds } from '../redux/prodsReducer'
import {
  showLoader,
  hideLoader,
  showAlert } from '../redux/appReducer'
import { Rest } from '../modules/fetch'

export default function ProdList(props) {

  const dispatch = useDispatch()

  useEffect(() => { fetchProds(props.request, setLastProds) },[props.request])

  function fetchProds(request, method) {
    dispatch(showLoader())
    Rest.getProducts(request)
    .then(json => {
        if (!json) {
          dispatch(showAlert("Что-то пошло не так!"))
          dispatch(hideLoader())
        }
        else if (json.error) {
          dispatch(showAlert(json.error))
          dispatch(hideLoader())
        }
        else {
          dispatch(hideLoader())
          dispatch(method(json))
        }
    })
  }

  const list = props.lastProds.map( product => 
      <div key={product.id}>
            <div className="sale">{product.sale && `-${product.sale}%`}</div>
            <a href={`#product/${product.id}`}>
                <img src={product.img200} alt={product.title} />
                <div>{product.title}</div>
            </a>
            <div className="divPrice">
                <b className="price">
                    {product.sale ? product.price * (100 - product.sale) / 100 : product.price} ₽
                </b>
                <s>{product.sale && product.price + " ₽"}</s>
            </div>
        </div>
  ).reverse()

  return (
    <>
    <div className="ProdList">
      {list}
    </div>
    {props.loading && <Loader />}
    {props.lastProds.length &&
    props.lastProds[0].index > 1 &&
    <button
        className="btn-primary"
        onClick={() => fetchProds(`orderBy="index"&startAt=${props.lastProds[0].index - 3}&endAt=${props.lastProds[0].index - 1}`, setMoreProds)}
    >Ещё</button>}
    </>
  )
}


//   return async dispatch => {
//       try {
//           // dispatch(showLoader())
//           const json = await 
//           setTimeout(() => {
//               dispatch({
//                   type: FETCH_PRODS,
//                   payload: Object.keys(json).map(
//                       key => ({ ...json[key], id: key })
//                     )
//               })
//               // dispatch(hideLoader())
//           }, 0)
//       } catch (e) {
//           dispatch(showAlert('Что-то пошло не так'))
//           // dispatch(hideLoader())
//       }
//   }
// }
// export default function ProdList(props) {

//     let prodsFilter = fetchGetProds(props.searchState)
    
    /* return (
       <div>
        { {props.searchState.text && prods.length > 0 &&
        <span>По запросу "{props.searchState.text}" найдено:</span>
        }
        {props.searchState.text && prods.length === 0 &&
        <span>Мы старались, но по запросу "{props.searchState.text}" мы ничего не нашли</span>
        } }
         <div>{prodList}</div>
        { <div className="prodList">{requestState ? prodList : 'loader'}</div> }
       </div>
     ) */
// }


// function handleError(response, where) {
//   if (response.error == "Auth token is expired") {
//       logout()
//   } else { where.innerHTML = `<p class="error">${response.error}</p>` }
// }

// function render(response, where, template) {
//   if (response && response.error) {
//     handleError(response, where)
//   } else {
//     let arr = response ? Object.keys(response)
//     .map(key => ({ ...response[key], id: key })) : []

//     if (where == byId('pageComments')) {
//       where.innerHTML = arr.map(template).join('')
//     } else {
//       where.innerHTML = arr.map(template).reverse().join('')
//     }
//     return arr
//   }
// }

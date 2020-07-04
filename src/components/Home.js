import React, { useEffect } from 'react'
import { Rest } from '../modules/fetch'
import { useDispatch } from 'react-redux'
import { showLoader, hideLoader, showAlert } from '../redux/appReducer'
import { setLastProds } from '../redux/prodsReducer'

export default function SearchBar() {
    const dispatch = useDispatch()

    useEffect(() => { window.scroll(0, 0) }, [])

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     let textValue = e.target.text.value
    //     if (!textValue) { textValue = ''}
    //     props.setSearchState( searchState => ({
    //         ...searchState,
    //         text: textValue
    //     }))
    // }

    return (
        <>
        {/* <div className="searchForm">
            <form
            // onSubmit={handleSubmit}
            >

                <input type="number"
                //  onChange={}
                  />
                        <button
                        // onClick={fetchProds}
                        >сброс</button>
                
                <select name="brand" id="brand"
                    onChange={getProdsByBrand}
                >
                    <option value="">Бренд</option>
                    <option value="LOADED">Loaded</option>
                    <option value="BTWIN">BTwin</option>
                    <option value="Z-Flex">Z-Flex</option>
                    <option value="Penny">Penny</option>
                    <option value="Madrid">Madrid</option>
                </select>
            </form>
        </div> */}
        <div className="homeGallery">
            <a><img src="https://www.traektoria.ru/upload/iblock/37a/37aa6a15a58a57701f8c2b5781a2011a.jpg" alt="loaded" /></a>
            <a><img src="https://i.ytimg.com/vi/qsOU05IeIDM/maxresdefault.jpg" alt="madrid" /></a>
            <a><img src="https://cdn.shopify.com/s/files/1/2175/4361/articles/1_122d3da6-4488-493b-a309-84b2362144db_560x560.jpg" /></a>
        </div>
        </>
    )

    function getProdsByBrand(e) {
        dispatch(showLoader())
        if (e.target.value)
            Rest.getFilteredProds("brand", e.target.value, 3)
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
                    dispatch(setLastProds(json))
                }
            })
        // else 
    }
}

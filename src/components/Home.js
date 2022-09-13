import React, { useEffect } from 'react'
// import { Rest } from '../modules/fetch'
// import { useDispatch } from 'react-redux'
// import { showLoader, hideLoader, showAlert } from '../redux/appReducer'
// import { setLastProds } from '../redux/prodsReducer'

export default function SearchBar() {
    // const dispatch = useDispatch()

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
            {/*<a href="#categ/longboard"><img src="https://i.ytimg.com/vi/qsOU05IeIDM/maxresdefault.jpg" /></a>*/}
        </div>
        </>
    )

    // function getProdsByBrand(e) {
    //     dispatch(showLoader())
    //     if (e.target.value)
    //         Rest.getFilteredProds("brand", e.target.value, 3)
    //         .then(json => {
    //             if (!json) {
    //                 dispatch(showAlert("Что-то пошло не так!"))
    //                 dispatch(hideLoader())
    //             }
    //             else if (json.error) {
    //                 dispatch(showAlert(json.error))
    //                 dispatch(hideLoader())
    //             }
    //             else {
    //                 dispatch(hideLoader())
    //                 dispatch(setLastProds(json))
    //             }
    //         })
    //     // else 
    // }
}

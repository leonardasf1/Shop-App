import React from 'react'

export default function SearchBar(props) {

    function handleSubmit(e) {
        e.preventDefault()
        let textValue = e.target.text.value
        if (!textValue) { textValue = ''}
        props.setSearchState( searchState => ({
            ...searchState,
            text: textValue
        }))
    }

    return (
        <div className="searchForm">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Что вы ищете?" name="text" />
                <button><span role="img" aria-label="найти">&#128270;</span></button>
            </form>
        </div>
    )
}

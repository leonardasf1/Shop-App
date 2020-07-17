import React from 'react'
import { Rest } from '../modules/fetch'

export default function Rewiews(props) {
    return (
        <div className="rewiews">
            Отзывы
            {props.auth.timer > Date.now() &&
            <form className="textfield--float-label" id="newRewiew"
            onSubmit={postNewRewiew}
            >
                    <textarea type="text" rows="3" id="textRewiew"/>
                    <label>Поделитесь опытом использования</label>
                    <button className=''>Опубликовать</button>
            </form>
            }
            {props.rewiews.map((rewiew, index) => 
                <div className="rewiew" key={index}>
                    <div>{rewiew.text}</div>
                    {rewiew.email.split("@")[0]} .
                    {new Date(rewiew.date).toLocaleDateString()}
                </div>    
            )}
        </div>
    )

    function postNewRewiew(e) {
        e.preventDefault()
    
        if (props.auth.timer > Date.now()) {
            
            let rewiewToSend = {
                text: e.target.elements.textRewiew.value,
                email: props.auth.email,
                product: props.productId,
                date: Date.now()
            }
            Rest.new(rewiewToSend, "rewiews", props.auth.idToken)
            .then(() => {
                e.target.elements.textRewiew.value = ''
            })
        }
    }
}

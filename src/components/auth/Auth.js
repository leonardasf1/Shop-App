import React, { useEffect } from 'react'
import './style.scss'
import { loginFormHandler, signupFormHandler, validAuth } from './script'
import { useDispatch } from 'react-redux'
import { deleteAuth } from '../../redux/actions'

let dispatch = {}
export default function Auth(props) {
    dispatch = useDispatch()

    useEffect(() => {
        document.querySelectorAll('.form__group input').forEach((i) => {
            i.addEventListener('blur', validAuth)
        })
    })
    return (
        <div className="block__content">
            {props.method}
        </div>
    )
}

export const loginHTML = (
  <form className="form" onSubmit={(e) => loginFormHandler(e, dispatch)}>
    <div className="form__group">
      <h3>Вход</h3>
      <div>
        <div className="textfield--float-label">
          <span className="error"></span>
          <input type="email" id="email" required />
    	  <label>Введите почту</label>
        </div>
        <div className="textfield--float-label">
          <span className="error"></span>
          <input type="password" required id="password" />
      	  <label>Введите пароль</label>
        </div>
      </div>
    </div>
    <div className="form__group">
      <button type="submit" className="mui-btn--primary">Войти</button>
    </div>
    <br /><p>Ещё нет аккаунта? <a href="#signup" id="a_signup">Зарегистрируйтесь</a></p>
  </form>
  )

export const signupHTML = (
<form className="form" id="signup-form" onSubmit={signupFormHandler}>
  <div className="form__group">
  	<h3>Регистрация</h3>
    <div>
      <div className="textfield--float-label">
        <span className="error"></span>
        <input type="text" required name="name" id="name" />
    	<label>Имя</label>
      </div>
      <div className="textfield--float-label">
        <span className="error"></span>
        <input type="email" required name="email" id="signEmail" />
    	<label>Электронный адрес</label>
      </div>
      <div className="textfield--float-label">
        <span className="error"></span>
        <input type="password" required name="password" id="pas" />
    	<label>Придумайте пароль</label>
      </div>
      <div className="textfield--float-label">
        <span className="error"></span>
        <input type="password" required name="password_2" id="pas2" />
    	<label>Повторите пароль</label>
      </div>
      <div className="textfield--float-label">
        <span className="error"></span>
        <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" name="tel" id="tel" />
    	<label>Номер мобильного телефона</label>
      </div>
    </div>
  </div>
  <div className="form__comment">
    <button type="submit" id="do_signup">Зарегистрироваться</button>
    <div>Уже есть аккаунт? <a href="#login" id="a_login">Войти</a></div>
    Нажимая кнопку «Зарегистрироваться»:
    <div>
      <input name="agreement" type="checkbox" required defaultChecked />
      Я принимаю <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Условия использования</a> и даю своё согласие на обработку моей персональной информации на условиях, определенных <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Политикой конфиденциальности</a>.
    </div>
  </div>
</form>
)

export const logout = function () {
    sessionStorage.auth = false
    // dispatch(deleteAuth())
}
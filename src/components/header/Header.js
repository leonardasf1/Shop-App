import React, { useEffect } from 'react'

import CatalogBar from '../CatalogBar'
import './style.css'
import { useDispatch } from 'react-redux'
import { deleteAuth } from '../../redux/appReducer'
import basket from '../../assets/basket-white.svg'

let dispatch = {}

export default function Header(props) {

  dispatch = useDispatch()
  useEffect(() => {
    setHeader()
  },[])
  sessionStorage.setItem(
      "cartProds", JSON.stringify(props.cartProds)
  )

    return (
      <header>
        <div>
          <a href="#home" className="logo btn"><b>Shop App</b></a>
          {/* <div className="searchForm">
              <form
              // onSubmit={handleSubmit}
              >
                  <span role="img" aria-label="найти">&#128270;</span>
                  <input type="text" placeholder="Поиск по каталогу" name="text" />
              </form>
          </div> */}
          <nav className="cd-main-nav-wrapper">
            <ul className="cd-main-nav">

            <li>
              <a className="cd-subnav-trigger btn"><span>Категории</span></a>
              <ul>
                <li className="go-back btn"><div>Меню</div></li>
                <CatalogBar />
              </ul>
            </li>


            {(!props.auth ||
            props.auth.status !== 'admin' ||
            props.auth.timer < Date.now()) &&
            <>
              <li><a href="#about" className="btn">О нас</a></li>
              {/* <li><a href="#0">Проекты</a></li>
              <li><a href="#0">Блог</a></li> */}
              <li><a href="#contacts" className="btn">Контакты</a></li>
            </>
            }
            {(!props.auth ||
            props.auth.timer < Date.now()) && 
              <li><a href="#auth" className="btn">Войти</a></li>
            }
            {props.auth.timer > Date.now() && 
              <li><a href="#user" className="btn">{props.auth.name}</a></li>
            }
            {props.auth.timer > Date.now() && 
              <li><a href="#home" className="btn" onClick={logout}>Выйти</a></li>
            }

            {props.auth.timer > Date.now() &&
            props.auth.status === 'admin' &&
            // props.auth.id === 'adminId' &&
              <li><a href="#adminOrderList" className="btn">Заказы</a></li>
            } {/* исправить */}
            {props.auth.timer > Date.now() &&
            props.auth.status === 'admin' &&
              <li><a href="#admin" className="btn">Добавить новый товар</a></li>
            } {/* исправить */}

            </ul>
          </nav>

          {props.cartProds.length > 0 &&
            <span>
              <a href="#order" className="basket btn">
                <img src={basket} alt="basket" />
                <span className="basket_count"> {props.cartProds.length} </span>
              </a>
            </span>
          }
          <a className="cd-nav-trigger btn">Menu<span></span></a>

          
        </div>
      </header>
    )
}

function setHeader() {
	function q(i) { return document.querySelector(i) }

	//mobile version - open/close navigation
	q('.cd-nav-trigger').addEventListener('click', function(e){
    e.preventDefault()
    q('header').classList.toggle('nav-is-visible')
		q('.cd-main-nav').classList.toggle('nav-is-visible')
	})

	//mobile version - go back to main navigation
	q('.go-back').addEventListener('click', function(e){
		e.preventDefault()
		q('.cd-main-nav').classList.remove('moves-out')
	})

	//open sub-navigation
	q('.cd-subnav-trigger').addEventListener('click', function(e){
		e.preventDefault()
		q('.cd-main-nav').classList.toggle('moves-out')
  })
  window.addEventListener( 'hashchange', () => {
    q('.cd-main-nav').classList.remove('moves-out')
    q('.cd-main-nav').classList.remove('nav-is-visible')
    q('header').classList.remove('nav-is-visible')
    if (sessionStorage.auth && sessionStorage.auth.timer < Date.now()) logout()
  })
}

export function logout() {
  sessionStorage.auth = false
  dispatch(deleteAuth())
}
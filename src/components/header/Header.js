import React, { useEffect } from 'react'

import CatalogBar from '../CatalogBar'
import './style.scss'
import { useDispatch } from 'react-redux'
import { deleteAuth } from '../../redux/appReducer'

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
          <a href="#home" className="logo"><b>Shop App</b></a>
          <div className="searchForm">
              <form
              // onSubmit={handleSubmit}
              >
                  <span role="img" aria-label="найти">&#128270;</span>
                  <input type="text" placeholder="Поиск по каталогу" name="text" />
              </form>
          </div>
          <nav className="cd-main-nav-wrapper">
            <ul className="cd-main-nav">

            <li>
              <a className="cd-subnav-trigger"><span>Категории</span></a>
              <ul>
                <li className="go-back"><a>Меню</a></li>
                <CatalogBar />
              </ul>
            </li>


            {(!props.auth ||
            props.auth.status !== 'admin' ||
            props.auth.timer < Date.now()) &&
            <>
              <li><a href="#0">О нас</a></li>
              {/* <li><a href="#0">Проекты</a></li>
              <li><a href="#0">Блог</a></li> */}
              <li><a href="#0">Контакты</a></li>
            </>
            }
            {(!props.auth ||
            props.auth.timer < Date.now()) && 
              <li><a href="#auth">Войти</a></li>
            }
            {props.auth.timer > Date.now() && 
              <li><a href="#user">{props.auth.name}</a></li>
            }
            {props.auth.timer > Date.now() && 
              <li><a href="#home" onClick={logout}>Выйти</a></li>
            }

            {props.auth.timer > Date.now() &&
            props.auth.status === 'admin' &&
            // props.auth.id === 'adminId' &&
              <li><a href="#adminOrderList">Заказы</a></li>
            } {/* исправить */}
            {props.auth.timer > Date.now() &&
            props.auth.status === 'admin' &&
              <li><a href="#admin">Добавить новый товар</a></li>
            } {/* исправить */}

            </ul>
          </nav>

          {props.cartProds.length > 0 &&
            <span><a href="#order" className="whiteCircle">
            <span role="img" aria-label="корзина">&#128722;</span> 
            <span className="blackCircle"> {props.cartProds.length} </span>
            </a></span>
          }
          <a className="cd-nav-trigger">Menu<span></span></a>
          
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
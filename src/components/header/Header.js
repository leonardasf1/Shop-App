import React from 'react'

import SearchBar from '../SearchBar'
import CatalogBar from '../CatalogBar'
import { logout } from '../auth/Auth'
import './style.scss'

export default function Header(props) {

  sessionStorage.setItem(
      "cartProds", JSON.stringify(props.cartProds)
  )

    return (
      <header>
        <div>
          <a href="#home" className="logo"><b>Shop App</b></a>
          <nav className="cd-main-nav-wrapper">
            <ul className="cd-main-nav">

            <li>
              <a className="cd-subnav-trigger"><span>Категории</span></a>
              <ul>
                <li className="go-back"><a>Меню</a></li>
                <CatalogBar />
              </ul>
            </li>

            <li><a href="#0">О нас</a></li>
            {/* <li><a href="#0">Проекты</a></li> */}
            {/* <li><a href="#0">Блог</a></li> */}
            <li><a href="#0">Контакты</a></li>
            {
            (!props.auth ||
            props.auth.timer < Date.now()) && 
              <li><a href="#auth">Войти</a></li>
            }
            {props.auth.timer > Date.now() && 
              <li><a href="#profile">{props.auth.email.split("@")[0]}</a></li>
            }
            {props.auth.timer > Date.now() && 
              <li><a onClick={logout} href="#home">Выйти</a></li>
            }

            {props.authEmail === 'admin' &&
              <li><a href="#orderList">Заказы</a></li>
            } {/* исправить */}
            {props.authEmail !== 'admin' &&
              <li><a href="#admin">Добавить новый товар</a></li>
            } {/* исправить */}

            </ul>
          </nav>

          {props.cartProds.length > 0 &&
            <li><a href="#order" className="whiteCircle">
            <span role="img" aria-label="корзина">&#128722;</span> 
            <span className="blackCircle"> {props.cartProds.length} </span>
            </a></li>
          }
          <a className="cd-nav-trigger">Menu<span></span></a>
          
          {/* <SearchBar setSearchState={props.setSearchState} /> */}
          
        </div>
      </header>
    )
}
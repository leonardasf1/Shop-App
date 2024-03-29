import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import Auth, { loginHTML, signupHTML } from './components/auth/Auth';
import Categoria from './components/Categoria';
import Footer from './components/Footer';
import Header from './components/header/Header';
import Order from './components/order/Order';
import ProdCard from './components/prodCard/ProdCard';
import ProdList from './components/ProdList';
import User from './components/user/User';

import { routing } from './modules/routing';

import AdminProd from './components/admin/AdminProd';
import AdminOrderList from './components/admin/AdminOrderList';
import AdminOrder from './components/admin/AdminOrder';
import UserOrder from './components/user/UserOrder';
import Home from './components/Home'
import Contacts from "./components/Contacts";
import About from "./components/About";

function App() {

  const dispatch = useDispatch()

  // const [searchState, setSearchState] = useState({text: '', filter: []});

  useEffect(() => {
    dispatch(routing())
    // window.scroll(0, 0)
  },[])

  const lastProds = useSelector(
    state => state.prods.lastProds
  )
  const separateProds = useSelector(
    state => state.prods.separateProds
  )
  const rewiews = useSelector(
    state => state.prods.rewiews
  )
  const loading = useSelector(
    state => state.app.loading
  )
  const route = useSelector(
    state => state.app.route
  )
  const auth = useSelector(
    state => state.app.auth
  )
  const orderInfo = useSelector(
    state => state.cart.orderInfo
  )
  const cartProds = useSelector(
    state => state.cart.cartProds
  )
  const orders = useSelector(
    state => state.app.orders
  )

  return (
    <div className="App">

      <Header
        auth={auth}
        cartProds={cartProds}
      />
      <main>

        { (route === '' || route === '#home') &&
        <>
          <Home />
          <ProdList
            loading={loading}
            request={`orderBy="index"&limitToLast=3`}
            lastProds={lastProds} />
        </>
        }
        { route === `#categ/${window.location.hash.split("#categ/")[1]}` &&
        lastProds.length > 0 &&
        <>
          <Categoria />
          <ProdList
            loading={loading}
            request={`orderBy="categ"&equalTo="${window.location.hash.split("#categ/")[1]}"&limitToLast=10`}
            lastProds={lastProds} />
        </>
        }
        { route === `#product/${window.location.hash.split("#product/")[1]}` &&
        lastProds.length > 0 &&
          <ProdCard
            auth={auth}
            product={
              lastProds.find(i => i.id === window.location.hash.split("#product/")[1]) ||
              separateProds.find(i => i.id === window.location.hash.split("#product/")[1])
            }
            productId={window.location.hash.split("#product/")[1]}
            cartProds={cartProds}
            rewiews={rewiews} />
        }
        { route === ('#auth' || '#admin' || `#adminOrderList` ||
          `#admin/${window.location.hash.split("#admin/")[1]}` ||
          `#adminorder/${window.location.hash.split("#adminorder/")[1]}` ||
          '#user' || `#userorder/${window.location.hash.split("#userorder/")[1]}`) &&
          (!auth || auth.timer < Date.now()) &&
          <Auth method={loginHTML} />
        }
        {route === '#signup' &&
        (!auth || auth.timer < Date.now()) &&
          <Auth method={signupHTML} />
        }
        { route === '#order' &&
          <Order
            auth={auth}
            cartProds={cartProds}
            // lastProds={lastProds}
            orderInfo={orderInfo}
          />
        }
        { route === '#user' &&
        auth.timer > Date.now() &&
          <User
            auth={auth}
            orders={orders}
          />
        }
        { route === '#admin' &&
        auth.timer > Date.now() &&
        auth.status === 'admin' && //изменить
          <AdminProd
            auth={auth}
            prod={false}
            newIndex={lastProds[lastProds.length - 1].index + 1}
          />
        }
        { route === `#admin/${window.location.hash.split("#admin/")[1]}` &&
        auth.timer > Date.now() &&
        auth.status === 'admin' && //изменить
          <AdminProd
            auth={auth}
            prod={lastProds.find(i => i.id === window.location.hash.split("#admin/")[1])}
          />
        }
        { route === `#adminOrderList` &&
        auth.timer > Date.now() &&
        auth.status === 'admin' && //изменить
          <AdminOrderList
            auth={auth}
            orders={orders}
          />
        }
        { orders.length > 0 &&
        route === `#adminorder/${window.location.hash.split("#adminorder/")[1]}` &&
        auth.timer > Date.now() &&
        auth.status === 'admin' && //изменить
          <AdminOrder
            auth={auth}
            order={orders.find(i => i.id === window.location.hash.split("#adminorder/")[1])}
          />
        }
        { orders.length > 0 &&
        route === `#userorder/${window.location.hash.split("#userorder/")[1]}` &&
        auth.timer > Date.now() &&
          <UserOrder
            auth={auth}
            order={orders.find(i => i.id === window.location.hash.split("#userorder/")[1])}
          />
        }
        { route === `#about` &&
        <About />
        }
        { route === `#contacts` &&
            <Contacts />
        }
      </main>
      <Footer />

    </div>
  );
}

export default App;
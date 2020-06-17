import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './App.scss';
import Auth, { loginHTML, signupHTML } from './components/auth/Auth';
import Categoria from './components/Categoria';
import Footer from './components/Footer';
import Header from './components/header/Header';
import Order from './components/order/Order';
import ProdCard from './components/prodCard/ProdCard';
import ProdList from './components/ProdList';
import Profile from './components/Profile';

import { routing } from './modules/routing';

import AdminProd from './components/admin/AdminProd';
import OrderList from './components/admin/OrderList';
import AdminOrder from './components/admin/AdminOrder';

function App() {

  const dispatch = useDispatch()

  // const [searchState, setSearchState] = useState({text: '', filter: []});

  useEffect(() => { dispatch(routing()) },[])

  const prods = useSelector(
    state => state.prods.fetchedProds
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
    state => state.prods.orderInfo
  )
  const cartProds = useSelector(
    state => state.prods.cartProds
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
          <ProdList
            loading={loading}
            request={`orderBy="index"&limitToLast=3`}
            prods={prods} />
        }
        { route === `#categ/${window.location.hash.split("#categ/")[1]}` &&
        prods.length > 0 &&
        <>
          <Categoria />
          <ProdList
            loading={loading}
            request={`orderBy="categ"&equalTo="${window.location.hash.split("#categ/")[1]}"&limitToLast=3`}
            prods={prods} />
        </>
        }
        { route === `#product/${window.location.hash.split("#product/")[1]}` &&
        prods.length > 0 &&
          <ProdCard
            prods={prods}
            cartProds={cartProds} />
        }
        { (route === '#auth' ||
        route === '#login') &&
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
            prods={prods}
            orderInfo={orderInfo}
          />
        }
        { route === '#profile' &&
          <Profile
            auth={auth}
          />
        }
        { route === '#admin' &&
        auth.email !== 'admin' && //изменить после настройки
          <AdminProd
            auth={auth}
            prod={false}
            newIndex={prods[prods.length - 1].index + 1}
          />
        }
        { route === `#admin/${window.location.hash.split("#admin/")[1]}` &&
        auth.email !== 'admin' && //изменить после настройки
          <AdminProd
            auth={auth}
            prod={prods.find(i => i.id === window.location.hash.split("#admin/")[1])}
          />
        }
        { route === `#orderList` &&
          <OrderList
            auth={auth}
            orders={orders}
          />
        }
        { orders.length > 1 &&
        route === `#adminorder/${window.location.hash.split("#adminorder/")[1]}` &&
        auth.email !== 'admin' && //изменить после настройки
          <AdminOrder
            auth={auth}
            order={orders.find(i => i.id === window.location.hash.split("#adminorder/")[1])}
          />
        }
      </main>
      <Footer />

    </div>
  );
}

export default App;
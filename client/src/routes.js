import {ADMIN_ROUTE, BASKET_ROUTE, SANATOR_ROUTE, LOGIN_ROUTE, ORDER_ROUTE, REG_ROUTE, SHOP_ROUTE} from "./utils/consts";
import Basket from "./Pages/Basket";
import AdminPage from "./Pages/AdminPage";
import Shop from "./Pages/Shop";
import Auth from "./Pages/Auth";
import SanatorPage from "./Pages/SanatorPage";
import Order from "./Pages/Order";


export const authRoutes = [

  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  },
  {
    path: BASKET_ROUTE,
    Component: Basket
  }
  ]

export const publicRoutes = [
{
  path: SHOP_ROUTE,
      Component: Shop
},
{
  path: LOGIN_ROUTE,
      Component: Auth
},
{
  path: REG_ROUTE,
      Component: Auth
},
{
  path: SANATOR_ROUTE + '/:id',
      Component: SanatorPage
},{
        path: ORDER_ROUTE,
        Component: Order
    },

]
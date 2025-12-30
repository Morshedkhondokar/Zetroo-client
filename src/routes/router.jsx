import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import Products from "../Pages/Products/Products";
import ProductsDetails from "../Pages/ProductsDetails/ProductsDetails";
import Cart from "../Pages/Cart/Cart";
import Error from "../Pages/Error/Error";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Statistics from "../Pages/Dashboard/AdminPage/Statistics";
import AddProduct from "../Pages/Dashboard/AdminPage/AddProduct";
import ManageProducts from "../Pages/Dashboard/AdminPage/ManageProducts";
import ManageOrders from "../Pages/Dashboard/AdminPage/ManageOrders";
import ManageUsers from "../Pages/Dashboard/AdminPage/ManageUsers";
import Profile from "../Pages/Dashboard/Profile/Profile";
import Wishlist from "../Pages/Dashboard/userPage/Wishlist";
import MyOrders from "../Pages/Dashboard/userPage/MyOrders";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/products",
        Component: Products,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/productsDetails/:id",
        Component: ProductsDetails,
      },
      {
        path: "/cart",
        Component: Cart,
      },
    ],
  },
  // Auth route
  { path: "/login", Component: Login },
  { path: "/signUp", Component: SignUp },

  // dasboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [

      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageProducts />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRoute>
            <AdminRoute>
              {" "}
              <ManageOrders />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-Orders",
        element: (
          <PrivateRoute>
            {" "}
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "Wishlist",
        element: (
          <PrivateRoute>
            {" "}
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

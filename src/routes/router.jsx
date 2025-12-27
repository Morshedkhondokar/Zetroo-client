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
import { Profiler } from "react";
import Profile from "../Pages/Dashboard/Profile/Profile";
import Wishlist from "../Pages/Dashboard/userPage/Wishlist";
import MyOrders from "../Pages/Dashboard/userPage/MyOrders";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <Error/>,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path:'/about',
                Component:About
            },
            {
                path:'/products',
                Component:Products
            },
            {
                path:'/contact',
                Component:Contact
            },
            {
                path:'/productsDetails/:id',
                Component:ProductsDetails
            },
            {
                path:'/cart',
                Component:Cart
            },
            
        ]
    },
    // Auth route
    {path:'/login', Component:Login},
    {path:'/signUp', Component:SignUp},

    // dasboard 
    {
        path:'/dashboard',
        element: <Dashboard/>,
        children:[
            {
                path:'statistics',
                element: <Statistics/>
            },
            {
                path:'add-product',
                element: <AddProduct/>
            },
            {
                path:'manage-products',
                element: <ManageProducts/>
            },
            {
                path:'manage-orders',
                element: <ManageOrders/>
            },
            {
                path:'manage-users',
                element: <ManageUsers/>
            },
            {
                path:'My-Orders',
                element: <MyOrders/>
            },
            {
                path:'Wishlist',
                element: <Wishlist/>
            },
            {
                path:'profile',
                element: <Profile/>
            },

        ]
    }
])


export default router;
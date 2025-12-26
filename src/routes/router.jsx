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
    {path:'/signUp', Component:SignUp}
])


export default router;
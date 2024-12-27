import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login/Login"
import Home from "./pages/Home/Home"
import Signup from "./pages/Signup/Signup"
import Layout from "./components/Layout/Layout"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import GuestRoute from "./components/GuestRoute/GuestRoute"
import UserProvider from "./context/User.context"
import CartProvider from "./context/Cart.context"
import Cart from "./pages/Cart/Cart"
import ProductDetails from "./pages/productDetails/productDetails"
import Wishlist from "./pages/Wishlist/Wishlist"
import WishlistProvider from "./context/Wishlist.context"
import Brands from "./pages/Brands/Brands"
import Categories from "./pages/Categories/Categories"
import Products from "./pages/Products/Products"
import Checkout from "./pages/Checkout/checkout"
import Order from "./pages/Order/Order"
import ForgetPassword from "./pages/forgetPassword/ForgetPassword"
import CodeVerification from "./pages/codeVerification/CodeVerification"
import ResetPassword from "./pages/resetPassword/ResetPassword"


function App() {
 
 const router = createBrowserRouter([
    {
      path:"/",
      element:(
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      ) ,
     children:[
      {index: true, element:<Home/>},
      {path: "cart" , element: <Cart/>},
      {path: "product/:id" , element: <ProductDetails />},
      {path: "wishlist" , element: <Wishlist/>},
      {path: "brands" , element: <Brands/>},
      {path: "categories" , element: <Categories/>},
      {path: "products" , element: <Products/>},
      {path: "checkout" , element: <Checkout/>},
      {path: "allorders" , element: <Order/>},
     
      


    
    ],
  },

  {
    path : "/",
    element :(
      <GuestRoute>
        <Layout/>
      </GuestRoute>
    ),
    children : [
      {path:"/signup",element:<Signup/>},
      {path:"/login", element:<Login/>},
      {path: "forgetpassword" , element:<ForgetPassword/>},
      {path: "verifycode" , element:<CodeVerification/>},
      {path: "resetpassword" , element:<ResetPassword/>}

      
    ],

  }

   
   
  ])

  return (
    <>
     <UserProvider>
      <WishlistProvider>
    <CartProvider>
    <RouterProvider router={router} />
    </CartProvider>
    </WishlistProvider>
     </UserProvider>
     <Toaster/>

   
    </>
  )
}

export default App

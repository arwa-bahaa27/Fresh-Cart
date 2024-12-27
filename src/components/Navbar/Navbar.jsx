import { Link, NavLink } from "react-router-dom"
import freshCartLogo from "../../assets/images/freshcart-logo.svg"
import { useContext, useEffect } from "react"
import { UserContext } from "../../context/User.context"
import { cartContext } from "../../context/Cart.context";


export default function Navbar() {

  const {token , logOut} = useContext(UserContext);
  const {cartInfo , getCartProducts} = useContext(cartContext);

  useEffect(()=>{
    getCartProducts()
  },[])
  return (
    <nav className="bg-slate-100 py-3 shadow-sm fixed top-0 left-0 right-0 z-50 ">
      <div className='container  flex items-center gap-12'>
      <a>
        <img src={freshCartLogo} alt="FreshCart LOgo"/>
      </a>

      {token && (<>
        <ul className="flex gap-5 items-center">
        <li>
          <NavLink to="/" className={({isActive})=>{
            return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
          }}>Home</NavLink>
          </li>
        <li>
          <NavLink to="/products"  className={({isActive})=>{
            return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
          }}>Products</NavLink>
        </li>
        <li>
          <NavLink to="/categories"  className={({isActive})=>{
            return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300  before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
          }}>Categories</NavLink>
        </li>
        <li>
          <NavLink to="/brands"  className={({isActive})=>{
            return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300  before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
          }}>Brands</NavLink>
        </li>
        <li>
          <NavLink to="/allorders"  className={({isActive})=>{
            return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300  before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
          }}>Orders</NavLink>
        </li>
        <li>
          <NavLink to="/wishlist"  className={({isActive})=>{
            return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300  before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
          }}>Wishlist</NavLink>
        </li>
      </ul>


      <Link className="cart relative ml-auto" to="/cart">
      <i className="fa-solid fa-cart-shopping cursor-pointer text-lg"></i>
      <div className="cart-counter flex justify-center items-center h-5 w-5 rounded-full bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300  text-white absolute right-0 top-0 translate-x-1/2 -translate-y-1/2">
      {cartInfo == null ? <i className="fa-solid fa-spinner fa-spin text-sm"></i> : <span className="text-sm font-semibold">{cartInfo.numOfCartItems}</span>}
     </div>
      </Link>

      </>)}

      <ul className= {`flex gap-5 items-center ${!token && "ms-auto" }`}>
        <li>
          <a href="https://www.facebook.com/" target="_blank"><i className="fa-brands fa-facebook"></i></a>
        </li>
        <li>
          <a href="https://www.twitter.com/" target="_blank"><i className="fa-brands fa-twitter"></i></a>
        </li>
        <li>
          <a href="https://www.instagram.com/?hl=en" target="_blank"><i className="fa-brands fa-instagram"></i></a>
        </li>
        <li>
          <a href="https://www.tiktok.com/" target="_blank"><i className="fa-brands fa-tiktok"></i></a>
        </li>
        <li>
          <a href="https://www.linkedin.com/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
        </li>
        <li>
          <a href="https://www.youtube.com/" target="_blank"><i className="fa-brands fa-youtube"></i></a>
        </li>
      </ul>


      <ul className="flex gap-5 items-center">
       {!token && (<>
        <li>
          <NavLink to="/signup"  className={({isActive})=>{
            return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300  before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
          }}>Sign up</NavLink>
        </li>
        <li>
          <NavLink to="/login"  className={({isActive})=>{
            return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300  before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold" : ""}`
          }}>Login</NavLink>
        </li>
       </>)}
       {token &&  <li onClick={logOut}>
          <NavLink to="/logout"><i className="fa-solid fa-right-from-bracket text-lg"></i></NavLink>
        </li>}
      </ul>
    </div>
    </nav>
  )
}

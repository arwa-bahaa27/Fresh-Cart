
import { useContext } from "react"
import { Link } from "react-router-dom"
import { wishlistContext } from "../../context/Wishlist.context"
import { cartContext } from "../../context/Cart.context";

export default function WishlistItem({productInfo}) {

    const {price , category , title , imageCover,id} = productInfo;
    //const {name} = category;

    const {removeProductFromWishlist , wishlistInfo} = useContext(wishlistContext)
    const {addProductToCart} = useContext(cartContext)

  return <>

  <div>
    <div className="wishlist-item bg-gray-100 px-6 py-4 rounded-lg flex items-center grow ">
       
        <img
        src={imageCover}
        alt=""
        className="w-24 h-24 rounded-full border-4 border-white object-cover"
        />
     
      
       <div className="ms-4">
       <h3 className="text-lg font-semibold text-gray-700"><Link  to={`/product/${id}`}>{title}</Link></h3>
        <h4 className="text-gray-500 font-semibold">{price}</h4>
       <button
       onClick={()=>{
        removeProductFromWishlist({productId : id})
       }}
        className="btn bg-red-500 hover:bg-red-600 text-white ">
       <i className="fa-solid fa-trash me-1"></i>
        Remove</button>
       </div>

       <div
       onClick={()=>{
        addProductToCart({ productId : id})
       }}
        className="ms-auto">
            <button className="btn bg-primary-600 hover:bg-primary-700 text-white font-semibold ms-auto">ADD TO CART</button>
        </div>
        </div>

       
      </div>
    

   
  </>
}

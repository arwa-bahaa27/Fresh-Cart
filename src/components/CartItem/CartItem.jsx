import { useContext } from "react";
import { cartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";


export default function CartItem({productInfo}) {

    const {count,price,product} = productInfo;
    const {title,imageCover,category,id} = product;
    const {removeProductFromCart , updateCount} = useContext(cartContext)
  return (
    <>

  <div className="flex gap-2">

  <div className="cart-item grow flex items-center justify-between bg-gray-100 px-6 py-4 rounded-lg">
        <img 
        src={imageCover}
        alt={title}
        className="w-24 h-24 rounded-full border-4 border-white object-cover"
        />
        <h3 className="text-lg font-semibold text-gray-700"><Link to={`/product/${id}`}>{title}</Link></h3>
        <h4 className="text-gray-500 font-semibold">{category.name}</h4>
        <div className="count flex gap-5 items-center">
            <span className="text-lg text-gray-600 font-semibold">{count}</span>
            <div className="icons space-y-2">
                <div 
                onClick={()=>{
                  updateCount({productId : id , count : count + 1 })
                }}
                className="plus w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center cursor-pointer">
                <i className="fa-solid fa-plus"></i>
                </div>
               <div
                onClick={()=>{
                  updateCount({productId : id , count : count - 1 })
                }}
                className="minus  w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center cursor-pointer">
               <i className="fa-solid fa-minus"></i>
               </div>
            </div>
        </div>

        <span>{price}</span>
    </div>


    <button 
    className="rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-300 p-3"
    onClick={() =>{
      removeProductFromCart({productId : id})
    }}>
    <i class="fa-solid fa-xmark"></i>
    </button>

  </div>
    </>
  )
}

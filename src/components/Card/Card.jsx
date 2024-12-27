import { useContext } from "react";
import { cartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";
import { wishlistContext } from "../../context/Wishlist.context";
import { useState } from "react";
import { useEffect } from "react";


export default function Card({productInfo}) {



    const {imageCover,title,price,category,description,ratingsAverage,id} = productInfo;

  let {addProductToCart} = useContext(cartContext);
  let {addProductToWishlist , removeProductFromWishlist , wishlistInfo} = useContext(wishlistContext)


  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Check if the product is in the wishlist when the component mounts
    if (wishlistInfo?.data) {
      const isProductInWishlist = wishlistInfo.data.some(product => product.id === id);
      setIsInWishlist(isProductInWishlist);
    }
  }, [wishlistInfo, id]);

  const toggleWishlist = () => {
    if (isInWishlist) {
        removeProductFromWishlist({ productId: id });
    } else {
      addProductToWishlist({ productId: id });
    }
  };
  return <>

      <div className="card group/card rounded-lg overflow-hidden shadow-lg">
       <div className="relative">
       <img src={imageCover}/>
       <div className="layer group-hover/card:opacity-100 transition-opacity duration-300 gap-3 absolute w-full h-full bg-slate-400  bg-opacity-40 opacity-0 left-0 top-0 flex items-center justify-center ">
        <div
        onClick={ toggleWishlist}
         className={`layer-icon cursor-pointer w-8 h-8 rounded-full ${isInWishlist ? 'bg-red-500' : 'bg-primary-500'} text-white flex items-center justify-center`}>
            <i className="fa-solid fa-heart"></i>
        </div>
        <div 
        onClick={ ()=> {
            addProductToCart({productId : id})
        } }
        className="layer-icon  cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center">
            <i className="fa-solid fa-cart-shopping"></i>
        </div>
        <Link to={`/product/${id}`} className="layer-icon cursor-pointer w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center">
            <i className="fa-solid fa-eye"></i>
        </Link>
       </div>
       </div>
        <div className="card-body p-4 space-y-3">
            <header>
                <h3 className="text-lg text-gray-600 font-semibold line-clamp-1">{title}</h3>
                <h4 className="text-primary-500 font-semibold">{category.name}</h4>
                <p className="text-gray-400 text-sm line-clamp-2">{description}</p>
                <div className="flex items-center justify-between">
                    <span>{price}</span>
                    <div>
                        <i className="fa-solid fa-star text-yellow-500 mr-1"></i>
                        <span>{ratingsAverage}</span>
                    </div>
                </div>
            </header>
        </div>

      </div>
  </>
}

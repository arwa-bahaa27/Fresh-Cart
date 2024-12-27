import { useContext, useEffect } from "react";
import WishlistItem from "../../components/wishlistItem/WishlistItem";
import { wishlistContext } from "../../context/Wishlist.context";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";


export default function Wishlist() {

    let {getWishlistProducts , wishlistInfo } = useContext(wishlistContext);
    useEffect( ()=>{
        getWishlistProducts()
    },[])
  return<>

  {wishlistInfo == null ? (
    <Loading/>
  ):

    <section>
    <h2 className="text-xl text-slate-600 font-semibold pl-4">Your Wishlist</h2>

    {wishlistInfo.count == 0 ?(
                <div className="mt-6 bg-gray-100 p-6 rounded-md shadow flex items-center justify-center flex-col gap-3">
                    <h2>
                         Your wishlist is empty. Start adding now by clicking the button below and find something you love!
                    </h2>
                   <Link to="/" className="btn bg-primary-600 hover:bg-primary-700 text-white">
                   Bact to Home
                   </Link>
                </div>
            ):(
                           <>
                            <div className="space-y-4 mt-6">
                                {wishlistInfo.data.map( (product)  => <WishlistItem  key={product._id} productInfo={product}/> )}
                            </div>
                            
                         
                           </>
                        )
            
            
            }
    
   </section>

  }

  
  </>
}

import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";



export const wishlistContext = createContext(null);

export default function WishlistProvider({children}){
    const {token} = useContext(UserContext);
    const [wishlistInfo , setWishlishInfo] = useState(null);
   
    //*ADD
   async function addProductToWishlist({productId}){

    let toastId = toast.loading("Addingg product to wishlist....");

    try{

        const options = {
            url : "https://ecommerce.routemisr.com/api/v1/wishlist",
            method : "POST",
            headers : {
                token : token
            },
            data : {
                productId : productId
            }
        }

        let {data} = await axios.request(options);
        if(data.status == "success"){
            console.log(data)
            toast.success(data.message)
            getWishlistProducts();
        }
    }catch(error){
        console.log(error)
    }finally{
        toast.dismiss(toastId)
    }


   }

   //*GET
   async function getWishlistProducts() {

  try{
    const options = {
        url : "https://ecommerce.routemisr.com/api/v1/wishlist",
        method : "GET",
        headers:{
            token : token
        }
    }

    let {data} = await axios.request(options);
    if(data.status == "success"){
        console.log(data)
        setWishlishInfo(data)
        
    }
    
  }catch(error){
    console.log(error)
  }
   }

   //*Remove
   async function removeProductFromWishlist({productId}) {
    let toastId = toast.loading("Removing Product from wishlist....")
    try{
        const options = {
            url : `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            method : "DELETE",
            headers : {
                token : token
            }
        }
        let {data} = await axios.request(options)
        if(data.status == "success"){
            console.log(data)
            toast.success("Product has been removed")
            setWishlishInfo(data)
            getWishlistProducts()
        }
    }catch(error){
        console.log(error)

    }finally{
        toast.dismiss(toastId)
    }
    
   }


return <wishlistContext.Provider value={{
    addProductToWishlist,
    getWishlistProducts,
    removeProductFromWishlist,
    wishlistInfo,
    

}}>


    {children}
</wishlistContext.Provider>

}
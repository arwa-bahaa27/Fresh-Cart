import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext = createContext(null)


export default function CartProvider( {children} ){

    const {token} = useContext(UserContext);
    const [cartInfo , setCartInfo] = useState(null);
 

    //* ADD
    async function addProductToCart({productId}){

    let toastId = toast.loading("Addingg product....");
try{
    
    const options = {
        url : "https://ecommerce.routemisr.com/api/v1/cart",
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
    toast.success(data.message)
    console.log(data)
    getCartProducts();
 }
}catch(error){
    console.log(error)
}finally{
    toast.dismiss(toastId)
}
    }


    //* GET
    async function getCartProducts(){

        try{
            const options = {

                url : "https://ecommerce.routemisr.com/api/v1/cart",
                method : "GET",
                headers :{
                    token : token
                }
            }
    
            let {data} = await axios.request(options)
            setCartInfo(data);
        }catch(error){
            console.log(error)
        }

    }

    //* REMOVE
    async function removeProductFromCart({productId}) {

        let toastId = toast.loading("Deleting Product....")

       try{
        const options = {
            url : `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method : "DELETE",
            headers : {
                token :token,
            }
        }

        let {data} = await axios.request(options);
        if(data.status == "success"){
            toast.success("Product has been deleted")
            setCartInfo(data);
        }
       }catch(error){
        console.log(error)
       }finally{
        toast.dismiss(toastId)
       }
        
    }

    //* CLEAR CART
    async function clearCart() {
          
        let toastId = toast.loading("Clear cart....");
       try{
        const options = {
            url : "https://ecommerce.routemisr.com/api/v1/cart",
            method : "DELETE",
            headers: {
                token : token,
            }
        }

        let {data} = await axios.request(options);

        if(data.message == "success"){
            console.log(data);

           setCartInfo({
            numOfCartItems : 0
           });
           toast.success("Cart is Cleared");

          
        }

       
       }catch(error){
        console.log(error);
       }finally{
        toast.dismiss(toastId)
       }
        
    }

    //* UPDATE COUNT
    async function updateCount({productId , count}) {

       try{
        const options = {
            url : `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method : "PUT",
            headers : {
                token : token,
            },
            data : {
                count
            }
        }

        let {data} = await axios.request(options);
        if(data.status == "success"){
            setCartInfo(data)
        }
       }catch(error){
        console.log(error)
       }

        
    }
     

    return <cartContext.Provider value={{
    addProductToCart ,
     getCartProducts ,
     cartInfo ,
     removeProductFromCart ,
     clearCart ,
     updateCount ,
     }}>
         {children}
    </cartContext.Provider>
}
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { cartContext } from '../../context/Cart.context'
import { UserContext } from '../../context/User.context'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {

    const {cartInfo} = useContext(cartContext)
    const {token} = useContext(UserContext)
    const navigate = useNavigate()
    const [payMethod , setPayMethod] = useState(null)
 
    async function createCashOrder(values){
        let toastId = toast.loading("Creating your order")

     try{
        const options = {
            url : `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
            method : "POST",
            headers : {
                token : token
            },
            data : values,
        };

       let {data} = await axios.request(options)
       if(data.status == "success"){
        toast.success("Your order has been created")
        setTimeout(()=>{
            navigate("/allorders")
        },2000)
       }
     }catch(error){
        console.log(error)
     }finally{
        toast.dismiss(toastId)
     }
    }

    async function handleOnlinePayment(values){

        try{
            const options = {

                url : `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method : "POST",
                headers : {
                    token : token
                },
                data : values,
        }; 
        let {data} = await axios.request(options);
        if(data.status == "success"){
            toast.loading("Redirecting to stripe")
           setTimeout( () =>{
            location.href = data.session.url
           },2000)
        }


        }catch(error){
            console.log(error)
        }

    }

    const formik = useFormik({
        initialValues:{
            
                "shippingAddress":{
                    "details": "",
                    "phone": "",
                    "city": ""
                    }
            
        },

        onSubmit:(values)=>{
            if(payMethod == "cash"){
                createCashOrder(values)
            }else{
                handleOnlinePayment(values)
            }
        }
    })
  return <>

  <section>
    <h1 className='text-xl text-gray-600 font-semibold mb-4 '>Shipping Address</h1>

    <form className='space-y-3' onSubmit={formik.handleSubmit}>
        <div className="city">
            <input type='text' className='form-control w-full' placeholder='City' value={formik.values.shippingAddress.city}
            onChange={formik.handleChange} name="shippingAddress.city"/>
        </div>

        <div className="phone">
            <input type='tel' className='form-control w-full' placeholder='Phone' value={formik.values.shippingAddress.phone}
            onChange={formik.handleChange} name="shippingAddress.phone"/>
        </div>

        <div className="details">
            <textarea className='form-control w-full' placeholder='Details ' value={formik.values.shippingAddress.details}
            onChange={formik.handleChange} name="shippingAddress.details"></textarea>
        </div>

        <button 
         onClick={ () => {
            setPayMethod("cash")
         }}
         type="submit" 
         className='btn bg-blue-500 hover:bg-blue-600 text-white mr-2'>Cash order</button>
        <button 
         onClick={ ()=>{
            setPayMethod("online")
         }}
         type="submit"
         className='btn bg-lime-500 hover:bg-lime-600 text-white'>Online payement</button>
    </form>
  </section>
  </>
}

import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/User.context'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom'

export default function Order() {

    const {token} = useContext(UserContext)
    const [orders , setOrders] = useState(null)
    let {id} = jwtDecode(token)

    async function getUserOrder(){
        const options = {
            url : `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
            method:"GET"
        }
        let {data} = await axios.request(options);
        setOrders(data)
    }

    useEffect(()=>{
        getUserOrder()
    },[])
  return <>

 {orders ?  <section className='space-y-4'>
   {orders.map( (order)=> 

<div  key = {order.id} className="order p-4 border-2 border-gray-500 border-opacity-25 rounded-lg">
<header className='flex justify-between items-center'>
    <div>
        <h2 className='text-gray-500'>Order Id</h2>
        <span className='font-semibold text-lg text-gray-700'>#{order.id}</span>
    </div>
    <div>

        {order.isPaid ? 
        <span className="inline-block px-3 py-1 mx-2 bg-blue-500 text-white font-semibold rounded-full">Paid</span>
        : 
        <span className="inline-block px-3 py-1 mx-2 bg-blue-500 text-white font-semibold rounded-full">Not paid</span>
        }

        {order.isDelivered ? <span className="inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-full">Delivered</span>
        :<span className="inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-full">In shipping process</span>}
        
    </div>
</header>

<div className='grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-4 mt-4'>
   {order.cartItems.map((product)=>
 <div key={product._id} className='product-item overflow-hidden border-2 border-gray-400 border-opacity-30  rounded-md'>

 <img src={product.product.imageCover} className='w-full'/>
 <div className='p-4 '>
 <h3 className='text-lg font-semibold line-clamp-2'>
    <Link to={`/product/${product.product.id}`}>{product.product.title}</Link>
 </h3>
 <div className=' mt-2 flex justify-between items-center'>
     <p><span className='font-bold underline'>count:</span>{product.count}</p>
     <span>{product.price}</span>
 </div>
    </div>

</div>
)}
</div>
<p className='text-lg mt-4'>Order total price is <span className='mx-1 text-primary-400 font-semibold'>{order.totalOrderPrice}</span>L.E</p>
</div>
)}
  </section> : <Loading/>}
  </>
}

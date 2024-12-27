import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";

export default function Products() {
   
    const[products,setProducts] = useState(null);

    async function getProducts(){
    
        const options ={
          url    : "https://ecommerce.routemisr.com/api/v1/products",
          method : "GET",
        }
    
        let {data} = await axios.request(options);
        setProducts(data.data)
      }
    
      useEffect(()=>{
        getProducts()
      },[])
  return <>

  {!products ? <Loading/> :  <div className="grid p-8 sm:gap-4 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-4">
     {products.map((product)=> <Card productInfo={product} key={product.id} />)}
     </div>}
  
  </>
}

import axios from "axios"
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import BrandCards from "../../components/BrandCards/BrandCards";


export default function Brands() {

    const [brands , setBrands] = useState([]);

    async function getBrands() {

        
            const options = {
                url : "https://ecommerce.routemisr.com/api/v1/brands",
                method : "GET"
            }
            let {data} = await axios.request(options);
            setBrands(data.data)
       
    }

    useEffect( () => {
        getBrands()
    } , [])
  return <>

<div className="flex flex-col justify-center items-center">
   <h1 className="text-center mb-5 text-3xl font-semibold text-primary-800">All Brands</h1>
   </div>

   {!brands ? <Loading/> :  <div className=" p-10 grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-4">
  
      {brands.map((brand)=> <BrandCards brandsInfo={brand} key={brand.id} />)}
      </div>}

  
  </>
}

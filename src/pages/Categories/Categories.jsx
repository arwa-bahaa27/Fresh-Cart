import axios from "axios";
import { useEffect } from "react";
import CategoriesCards from "../../components/CategoriesCards/CategoriesCards";
import { useState } from "react";


export default function Categories() {
    const [categories , setCategories] = useState([]);

    async function getCategories() {

        const options = {
            url : "https://ecommerce.routemisr.com/api/v1/categories",
            method : "GET",
        }

        let {data} = await axios.request(options);
        setCategories(data.data)


        
    }

    useEffect( ()=> {
        getCategories()
    },[])

  return <>

   {!categories ? <Loading/> :  <div className=" p-10 grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-4">
    
        {categories.map((category)=> <CategoriesCards categoriesInfo={category} key={category.id} />)}
        </div>}
 

  </>
}

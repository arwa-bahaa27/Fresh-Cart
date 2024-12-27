import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CodeVerification() {
    const navigate = useNavigate();

    async function verifyCode(values) {
          try{
    
    const options = {
        url : "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method : "POST",
        data : values,
    }
    let {data} = await axios.request(options)
    console.log(data)
   if(data.status == "Success"){
    
    setTimeout(()=>{
        navigate("/resetpassword")
    },2000)
   }
}catch(erorr){
    console.log(erorr)
}
        
    }

    const formik = useFormik({
        
            initialValues:{
                "resetCode":""
            },

            onSubmit:verifyCode
        
    })
  return <>



<section>
    <h2 className="text-2xl text-slate-700 font-semibold pl-4">Enter code that has been sent</h2>
    <form className="space-y-3" onSubmit={formik.handleSubmit}>
       <div className="space-y-3 mt-3 pl-4">
       <input type="text" className="form-control w-full" placeholder="Code"
        value={formik.values.resetCode}
        onChange={formik.handleChange}
        name="resetCode"/>
       </div>

      <div className="pl-4">
      <button 
      className="btn bg-primary-900 hover:bg-primary-900 text-white"
      type="submit"
      >Verify</button>
      </div>
    </form>
   
  </section>
  
  
  
  </>
}

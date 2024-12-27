import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/User.context'
import { useContext } from 'react'

export default function ResetPassword() {
    const navigate = useNavigate();
      let {setToken} = useContext(UserContext)
    

    
    

    async function resetPassword(values) {

      try{
        const options = {
            url : "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
            method : "PUT",
            data : values,
        }
        let {data} = await axios.request(options)
        console.log(data)
        if(data){
            localStorage.setItem("token" , data.token)
            setToken(data.token)
            setTimeout(()=>{
                navigate("/")
              },2000)
            
        }else{
            console.log("nor returned token")
        }
      
      }catch(error){
        console.log(error)
      }
        
    }

    

    const formik = useFormik({
        initialValues: {
            
                "email":"",
                "newPassword": ""
            
        },

        onSubmit:resetPassword
    })
  return <>

<section>
    <h2 className="text-2xl text-slate-700 font-semibold pl-4">Reset your account password</h2>
    <form className="space-y-3" onSubmit={formik.handleSubmit}>
    <div className=" email space-y-3 mt-3 pl-4">
       <input type="text" className="form-control w-full" placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        name="email"/>
       </div>
       <div className=" new-Password space-y-3 mt-3 pl-4">
       <input type="password" className="form-control w-full" placeholder="New password"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        name="newPassword"/>
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

import axios from 'axios';
import { useFormik, validateYupSchema } from 'formik'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { data, useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup'

export default function Signup() {
  
  const navigate = useNavigate();
  const [accountExistError,setAccountExistError] =useState(null) 
  
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}/;

  

  const validation = object({
    name : string()
    .required("Name is required")
    .min(3,"Name must be at least 3 charachters")
    .max(25,"Name can not be more tan 25 characters"),

    email : string()
    .required("Email is required")
    .email("Email is invalid"),

    password : string()
    .required("Password is required")
    .matches(
      passwordRegex,
    "Password should be at least eight characters , at least one upper case English letter, one lower case English letter, one number and one special character"),

    rePassword : string()
    .required("Confirming password is required")
    .oneOf([ref("password")],"Password and confirm password should be the same"),

    phone : string()
    .required("Phone is required")
    .matches(phoneRegex,"We accept Egyptian numbers only."),

   
  });

   async function sendDataToRegister(values){

   const loadingToastId =  toast.loading("Waiting....")
    try{
      const options = {
        url : "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method : "POST",
        data : values
      }
  
      let {data} = await axios.request(options)
      if(data.message == "success"){
        toast.success("User registered successfully")
        setTimeout(()=>{
          navigate("/login")
        },2000)
      }
    }catch(error){
      
      setAccountExistError(error.response.data.message)

    }finally{
      toast.dismiss(loadingToastId)
    }
   

  }

 const formik = useFormik({
    initialValues:{
      
        "name": "",
        "email":"",
        "password":"",
        "rePassword":"",
        "phone":""
    },

   validationSchema:validation,

   onSubmit:sendDataToRegister
    
  });

  

  
  return <>
  
  <h1 className='text-xl text-slate-700 font-semibold mb-5'>
  <i className="fa-regular fa-circle-user mr-2"></i>Register Now</h1>

  <form className='space-y-3' onSubmit={formik.handleSubmit}>
    <div className='name'>
    <input className='form-control w-full' type='text' placeholder='Type your Name'
     value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name='name'/>

     {formik.errors.name && formik.touched.name &&  <p className='text-red-500 mt-1 text-sm'>*{formik.errors.name}</p>}
    </div>

    <div className='email space-y-3'>
    <input className='form-control w-full' type='email' placeholder='Type your Email'
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name='email'/>

      {formik.errors.email && formik.touched.email &&  <p className='text-red-500 mt-1 text-sm'>*{formik.errors.email}</p>}
      {accountExistError &&  <p className='text-red-500 mt-1 text-sm'>*{accountExistError}</p>}
    </div>

    <div className='password space-y-3'>
    <input className='form-control w-full' type='password' placeholder='Password'
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name='password'/>

      {formik.errors.password && formik.touched.password &&  <p className='text-red-500 mt-1 text-sm'>*{formik.errors.password}</p>}
    </div>

    <div className='repassword space-y-3'>
    <input className='form-control w-full' type='password' placeholder='Repassword'
      value={formik.values.rePassword}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name='rePassword'/>

{formik.errors.rePassword && formik.touched.rePassword &&  <p className='text-red-500 mt-1 text-sm'>*{formik.errors.rePassword}</p>}
    </div>

    <div className='phone space-y-3'>
    <input className='form-control w-full' type='tel' placeholder='Phone'
      value={formik.values.phone}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name='phone'/>

{formik.errors.phone && formik.touched.phone &&  <p className='text-red-500 mt-1 text-sm'>*{formik.errors.phone}</p>}
    </div>

    <button type='submit' className='btn bg-primary-700 hover:bg-primary-800 text-white'>Sign Up</button>
  </form>
  </>
}

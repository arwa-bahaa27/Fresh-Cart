import axios from 'axios';
import { useFormik, validateYupSchema } from 'formik'
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { data, useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup'
import {UserContext} from '../../context/User.context';
import { Link } from 'react-router-dom';

export default function Login() {

  let {setToken} = useContext(UserContext)
  const [loginIncorrect , setLoginIncoreect]=useState(null); 
  
  const navigate = useNavigate();
 
  
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  

  

  const validation = object({
  

    email : string()
    .required("Email is required")
    .email("Email is invalid"),

    password : string()
    .required("Password is required")
    .matches(
      passwordRegex,
    "Password should be at least eight characters , at least one upper case English letter, one lower case English letter, one number and one special character"),

   

   
  });

   async function sendDataToLogin(values){

   const loadingToastId =  toast.loading("Waiting....")
    try{
      const options = {
        url : "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method : "POST",
        data : values
      }
  
      let {data} = await axios.request(options)
      console.log(data)
      if(data.message == "success"){
        localStorage.setItem("token" , data.token);
        setToken(data.token)
        toast.success("User Logged in successfully")
        setTimeout(()=>{
          navigate("/")
        },2000)
      }
    }catch(error){
      
      setLoginIncoreect(error.response.data.message)

    }finally{
      toast.dismiss(loadingToastId)
    }
   

  }

 
 const formik = useFormik({
    initialValues:{
      
        "email":"",
        "password":"",
    },

   validationSchema:validation,

   onSubmit:sendDataToLogin
    
  });

  

  
  return <>
  
  <h1 className='text-xl text-slate-700 font-semibold mb-5'>
  <i className="fa-regular fa-circle-user mr-2"></i>Login</h1>

  <form className='space-y-3' onSubmit={formik.handleSubmit}>
    

    <div className='email space-y-3'>
    <input className='form-control w-full' type='email' placeholder='Type your Email'
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name='email'/>

      {formik.errors.email && formik.touched.email &&  <p className='text-red-500 mt-1 text-sm'>*{formik.errors.email}</p>}
      
      
    </div>

    <div className='password space-y-3'>
    <input className='form-control w-full' type='password' placeholder='Password'
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      name='password'/>

      {formik.errors.password && formik.touched.password &&  <p className='text-red-500 mt-1 text-sm'>*{formik.errors.password}</p>}
      {loginIncorrect && <p className='text-red-500 mt-1 text-sm'>*{loginIncorrect}</p>}
    </div>

   

   

    <button type='submit' className='btn bg-primary-700 hover:bg-primary-800 text-white'>Login</button>
  </form>
  <div className='mt-4'>
  <Link to="/forgetpassword" className="text-lg text-gray-500 font-semibold hover:text-gray-700">Forget your password?</Link>
  </div>
  </>
}

import axios from "axios"
import { useFormik } from "formik"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


export default function ForgetPassword() {
    const navigate = useNavigate();
  async  function forgetPassword(values){
    let toastId = toast.loading("Sending verfication code")

    try{
        const options = {
            url : "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
            method : "POST",
            data: values,
        }
        let {data } = await axios.request(options)
       if(data.statusMsg == "success"){
        console.log(data)
        toast.success(data.message)
        setTimeout(()=>{
            navigate("/verifycode")
        },2000)

       }
    }catch(error){
        console.log(error)
    }finally{
        toast.dismiss(toastId)
    }



    }
    const formik = useFormik({
        initialValues:{
            
                "email":""
            
        },
        onSubmit:forgetPassword
    })
  return<>

  <section>
    <h2 className="text-2xl text-slate-700 font-semibold pl-4">Enter your registered email</h2>
    <form className="space-y-3" onSubmit={formik.handleSubmit}>
       <div className="space-y-3 mt-3 pl-4">
       <input type="email" className="form-control w-full" placeholder="Your Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        name="email"/>
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

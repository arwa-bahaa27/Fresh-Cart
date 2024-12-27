import amazonPay from "../../assets/images/amazon-pay.png"
import americanExpreePay from "../../assets/images/American-Express-Color.png"
import masterCardPay from "../../assets/images/mastercard.webp"
import payPalPay from "../../assets/images/paypal.png"
import appStore from "../../assets/images/get-apple-store.png"
import playStore from "../../assets/images/get-google-play.png"

export default function Footer() {
  return <>

  <footer className="bg-slate-100 py-8">
    <div className="container space-y-4">
     
     <header>
       
     <h2 className="text-xl font-semibold text-slate-800">Get the FreshCart app</h2>
      <p className="text-slate-400">We will send you a link, open it on your phone to download the app.</p>
     </header>

      <div className="flex gap-2">
        <input type="email" placeholder="Email.." className="form-control grow"/>
        <button className="btn text-sm font-semibold bg-primary-800 hover:bg-primary-900 text-white uppercase">Share App Link</button>
      </div>


      <div className="flex justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50">
        <div className="payment-partners flex gap-3 items-center">
          <h3>Payment Partners</h3>
          <img  className="w-24"  src={amazonPay}/>
          <img  className="w-24" src={americanExpreePay}/>
          <img  className="w-20" src={masterCardPay}/>
          <img  className="w-24" src={payPalPay}/>


        </div>

        <div className="download flex gap-3 items-center">
        <h3>Get deliveries with FreshCart</h3>
        <img  className="w-24" src={appStore}/>
        <img  className="w-[108px]" src={playStore}/>
      </div>
</div>
    </div>
  </footer>
  </>
}

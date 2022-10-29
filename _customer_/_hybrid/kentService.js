import axios from 'axios'
import { Constant } from '../Constant';
import moment from "moment";
import "moment-timezone";

const currentUrl = "https://payment.team20.work/response.php"
// const currentUrl = window.location.href

const Payment = async (amount) => {
  try {
    const tokenUrl = Constant.kentPaymentUrl+"/ePay/api/cbk/online/pg/merchant/Authenticate"
    const tokenData = {
      ClientId: Constant.kentClientId,
      ClientSecret: Constant.kentClientSecret,
      ENCRP_KEY: Constant.kentENCRP_KEY
    }
 
    const tokenRes = await axios.post(tokenUrl, tokenData, {
      headers: {
        "Authorization": "Basic " + btoa(Constant.kentClientId+":"+Constant.kentClientSecret),
        "Content-Type": "application/json",
        "cache-control": "no-cache"
      }
    });

    const AccessToken = tokenRes?.data?.AccessToken
    const epayUrl = Constant.kentPaymentUrl+"/ePay/pg/epay?_v="+AccessToken
    const timeNow  =  moment().tz("Asia/Kuwait").valueOf()
    const epayData = {
      tij_MerchantEncryptCode: Constant.kentENCRP_KEY,
      tij_MerchAuthKeyApi: AccessToken,
      tij_MerchantPaymentLang: 'en',
      tij_MerchantPaymentAmount: amount,
      tij_MerchantPaymentTrack: timeNow,
      tij_MerchantPaymentRef: timeNow,
      tij_MerchPayType: 1,
      tij_MerchReturnUrl: currentUrl,
      tij_MerchantUdf1: '',
      tij_MerchantUdf2: '',
      tij_MerchantUdf3: '',
      tij_MerchantUdf4: '',
      tij_MerchantUdf5: ''
    }

    const epayRes = await axios.post(epayUrl, epayData, {
      headers: {
        "Authorization": "Basic " + btoa(Constant.kentClientId+":"+Constant.kentClientSecret),
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "Access-Control-Allow-Origin":"*"
      }
    });
    console.log(epayRes, 'epayRes')
    if(epayRes) return true
  } catch (err) {
    return false
  }
}

const kentService = {
  Payment,
}

export default kentService
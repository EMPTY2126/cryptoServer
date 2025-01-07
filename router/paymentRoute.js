import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { Router } from 'express';
import SHA256 from 'crypto-js/sha256.js';


const salt_key = '96434309-7796-489d-8924-ab56988a6076';
const salt_index = 1
const merchantId = 'PGTESTPAYUAT86'
const phonePe_url = 'https://api-preprod.phonepe.com/apis/pg-sandbox'
const APIpayendpoint = "/pg/v1/pay";
const APIpaystatusendpoint = "/pg/v1/status";

const my_url = "http://localhost:3000";
export const router = Router();


router.post('/pay', async(req, res) => {
    const {user,amount} = req.body;
    let amountInt = parseInt(amount, 10); 
    const merchantTransactionId = uuidv4();
    let payload = {
        merchantId: merchantId,
        merchantTransactionId: merchantTransactionId,
        merchantUserId: user,
        amount: amountInt*100,
        redirectUrl: `${my_url}/paymentstatus/${merchantTransactionId}`,
        redirectMode: "REDIRECT",
        mobileNumber: "9945242321",
        paymentInstrument: {
            type: "PAY_PAGE",
        },
    };

    const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
    const base64EncodedPayload = bufferObj.toString("base64");

    let string = base64EncodedPayload + "/pg/v1/pay" + salt_key;
    let sha256_val = SHA256(string);
    let xVerifyChecksum = sha256_val + "###" + salt_index;

    const options = {
        method: "post",
        url: `${phonePe_url}${APIpayendpoint}`,
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": xVerifyChecksum
        },
        data: {
            request: base64EncodedPayload,
        }
    };

    try {
        const response = await axios.request(options);
        // console.log(response.data);
        
        res.status(200).json({
          isSuccess: true,
          url: response.data.data.instrumentResponse.redirectInfo.url
        });
      } catch (error) {
        console.error(error);
        
        res.status(200).json({
          isSuccess: false
        });
      }
});

router.get('/status/:merchenttransactionId',async (req,res)=>{
    const merchentTransactionId = req.params.merchenttransactionId;
    let string = `/pg/v1/status/${merchantId}/${merchentTransactionId}` + salt_key;
    let sha256_val = SHA256(string);
    const x_verify = sha256_val + "###" + salt_index;
    const options = {
        method: "get",
        url: `${phonePe_url}${APIpaystatusendpoint}/${merchantId}/${merchentTransactionId}`,
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-MERCHANT-ID":merchentTransactionId,
            "X-VERIFY": x_verify
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.json({success:true, transaction:response.data});
      } catch (error) {
        res.json({success:false});
        console.error(error);
      }
});
import { Payment } from "../models/payment.model.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv'
dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



// checkout
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;
  try {
    let options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({
      orderId: order.id,
      amount: amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created",
    });
  } catch (error) {
    console.log("Error fetchin in payment controllers", error);
  }
};

// verify-payment
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;
  // const secret = razorpay.key_secret;
  // const body = orderId + "|" + paymentId;

  // save to db
  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus:"paid"
  });

res.status(201).json({
  sucess:true,
  message:"payment sucessfully",
  orderConfirm
})






  // try {
  //   const isValidSignature = validateWebhookSignature(
  //     body,
  //     signature,
  //     secret
  //   );
  //   if (isValidSignature) {
  //     // Update the order with payment details
  //     const orders = readData();
  //     const order = orders.find((o) => o.order_id === orderId);
  //     if (order) {
  //       order.status = "paid";
  //       order.payment_id = paymentId;
  //       writeData(orders);
  //     }
  //     res.status(200).json({ status: "ok" });
  //     console.log("Payment verification successful");
  //   } else {
  //     res.status(400).json({ status: "verification_failed" });
  //     console.log("Payment verification failed");
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res
  //     .status(500)
  //     .json({ status: "error", message: "Error verifying payment" });
  // }

};

// user specifiorder
export const userOrder = async(req,res)=>{
  let userId = req.user._id.toString();
  
  let orders = await Payment.find({userId}).sort({orderDate :-1});
  res.status(201).json({
    sucess:true,
    message:"Order Sucessfully",
    orders
  })
}
// user specifiorder
export const allOrder = async(req,res)=>{
   
  let orders = await Payment.find().sort({orderDate :-1});
  res.status(201).json({
    sucess:true,
    message:"All Order",
    orders
  })
}



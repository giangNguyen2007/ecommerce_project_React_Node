import StripeCheckout from "react-stripe-checkout";

import React, { useContext } from 'react'
import { baseRequest } from "../../../axios";
import { useState } from "react";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';


const STRIPE_PUBLIC_KEY = 'pk_test_51O1p7mJ48YTMVMRZN3ydoUFTR9DHuiMEwcujai2JxY0bG0GqJc0K3BVjcn50KWByJYDce9ZJng6Xjvj3j172XrWx00LJzOokxn'

const PaymentButton = ({quantity}) => {

    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)

    // function to run after receiving token from Stripe
    const onToken = (token) => { 
       setStripeToken(token);
    }

    useEffect(() => {
      const stripeRequest = async () => { 
            debugger;
            try {
                const response = await baseRequest.post('/checkout/payment', {
                    tokenId: stripeToken.id,
                    amount: quantity * 100
                });

                console.log(response.data)
                navigate('/payment-success', { state: response.data});

            } catch (error) {
                console.log(error)
            }
       }

       stripeToken && stripeRequest();
    
    }, [stripeToken, navigate, quantity]);
  return (
    <div className="pay-btn-wrapper">
        <StripeCheckout
            name='Fictive Payment'
            billingAddress
            shippingAddress
            amount = {quantity * 100}
            token={onToken}
            stripeKey={STRIPE_PUBLIC_KEY}
        >
         
            <button id='pay-btn' style={{ width: '120px'}} disabled={!user} > 
                PAY NOW
            </button>
        </StripeCheckout>
    </div>
  )
}

export default PaymentButton
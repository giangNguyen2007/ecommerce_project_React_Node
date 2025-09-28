import { useContext } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../context.js/CartContext";
import { AuthContext } from "../context.js/AuthContext";
import { Link } from 'react-router-dom';
import { baseRequest } from "../axios";


const PaymentSuccess = () => {
    const location = useLocation();
    const stripeData = location.state;

    const {cartItems, cartTotal, dispatchCart} = useContext(CartContext);
    const {user} = useContext(AuthContext);
    const [orderId, setOrderId] = useState(null);

    // after successful payment, send order to backend


    

  useEffect(() => {
  
    const order = {
        userId : user._id,
        products: cartItems.map( (cartItem) => ({
                    productId: cartItem.product._id,
                    quantity : cartItem.quantity
        })),
        amount: cartTotal,
        address: stripeData.billing_details.address
    }


    const createOrder = async () => {
        debugger;
        try {
            const response = await baseRequest.post(`/order/${user._id}`, order, {
                headers: {
                    token: 'Bearer ' + user.accessToken
                }
            })

            setOrderId(response.data._id)
            
        } catch (error) {
            console.log(error)
        }
    };

    stripeData && createOrder();

  }, [stripeData]);

  return (
    <div
        style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}

        <Link to={`/home`}>
            <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
        </Link>
    </div>
  );
};

export default PaymentSuccess;
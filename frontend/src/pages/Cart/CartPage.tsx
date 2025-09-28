import './CartPage.css'
import React, { useContext } from 'react'
import ProductCart from './CartPageComponents/Product-Cart'
import { Link } from 'react-router-dom';
import PaymentButton from './CartPageComponents/PaymentButton';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { saveCart } from '../../customHooks/cartAPI';
import { ICartProductBackend } from '../../Types';

const CartPage = () => {

    const {cartItems, cartTotal, dispatchCart} = useContext(CartContext);
    const {user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSaveCart = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
           // if user logged in, save cart data in backend
        if (user) {
            // debugger;
            const products : ICartProductBackend[] = cartItems.map( (cartItem) => 
                ({
                    productId: cartItem.product.id,
                    color : cartItem.product.color,
                    size: cartItem.product.size,
                    key: cartItem.product.key,
                    quantity : cartItem.quantity
                }) 
            )

            saveCart(user, products);
        } 
     }
    

  return (
        <div className="page-cart">
            <h1> YOUR BAG</h1>

            <button id='back-btn' onClick={(e) => navigate(-1)}> {'<'} BACK </button>
            <button disabled={!user} id='add-cart-btn' onClick={handleSaveCart}> SAVE CART </button>
            {!user && <div id='login-message'>Register or Login to save cart</div>}

            <div className="cart-sub-wrapper">

                <div className="product-list-wrapper" >
                    {cartItems.map( item => (
                        <ProductCart 
                            key = {item.product.key}
                            product = {item.product}
                            quantity = {item.quantity}
                        /> 
                    ))}
                
                </div>

                <div className="cart-summary-wrapper wrapper-w-border">

                    <div className='section-title'>SUMMARY</div>

                    <div className="summary-table" >
                        <div className="left-col" >
                            <div  className='check-out-item'>Subtotal: </div>
                            <div className='check-out-item'> Shipping: </div>
                            <div className='check-out-item total'> Total </div>
                        </div> 
                        <div className="right-col" >
                            <div  className='check-out-item'>€ {cartTotal? cartTotal : 0}</div>
                            <div className='check-out-item'>€ {cartTotal * 0.1}</div>
                            <div className='check-out-item total'>€ {Math.round(cartTotal*1.1*100)/100}</div>
                        </div> 
                    </div>
                    
                    <PaymentButton quantity = {cartTotal} />
                    {(!user) && <div id='login-message-pay'>Register or Login to pay</div>}
                
                </div>
            </div>


        </div>
  )
}

export default CartPage
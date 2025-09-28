
import React, { useContext, useState } from 'react';

import { saveCart, fetchUserCart, fetchSingleProduct } from './cartAPI';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { ICartBackend, ICartProduct, ICartProductBackend, IProduct, User } from '../Types';


const useChangeCart = () => {
    

    const {cartItems, dispatchCart} = useContext(CartContext);
    const {user } = useContext(AuthContext);

    const addItemToCart = ( product: IProduct, quantity: number, selectColor: string, selectSize: string) => { 

        // debugger;

    const cartProduct : ICartProduct = {
            id : product.id,
            title : product.title,
            img : product.img,
            key : product.id + '&' + selectColor + '&' + selectSize,
            color: selectColor,
            size: selectSize,
            price: product.price
        }

        // check if product already in cart
        const index = cartItems.findIndex( item => item.product.key === cartProduct.key);

        if (index > -1) {
            // if product already in cart => update quantity
            dispatchCart({
                type: 'UPDATE_ONE',
                payload: {
                    product: cartProduct,
                    quantity: quantity + cartItems[index].quantity
                }
            });

            dispatchCart({type: 'UPDATE_TOTAL_PRICE_AND_QUANTITY'})

        } else {
            // if product not already in cart => add to cart
            dispatchCart({
                type: 'ADD_ONE',
                payload: {
                    product: cartProduct,
                    quantity: quantity,
                }
            });

            dispatchCart({type: 'UPDATE_TOTAL_PRICE_AND_QUANTITY'})

        }
        
    }

    const removeItemFromCart = ( key: string) => { 

        // check if product already in cart
        const index = cartItems.findIndex( item => item.product.key === key);

        if (index > -1) {
            dispatchCart({
                type: 'REMOVE_ONE',
                payload: {
                    key
                }
            });

            dispatchCart({type: 'UPDATE_TOTAL_PRICE_AND_QUANTITY'})

        } 

    }

    const loadUserCart = async (userResponse : User) => { 

        try {
            const userCart : ICartBackend|null = await fetchUserCart(userResponse);
            // debugger;
            if (userCart) {
                for (const item of userCart.products){
                    const product : IProduct = await fetchSingleProduct(item.productId)
                    addItemToCart(product, item.quantity, item.color, item.size);
                } 
            }
         
        } catch (error: any) {
            throw Error(error)
        }
     
    }


  return {addItemToCart, removeItemFromCart, loadUserCart}
}

export default useChangeCart
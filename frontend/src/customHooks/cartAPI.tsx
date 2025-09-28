import { useContext } from 'react';
import { baseRequest } from '../axios';
import useChangeCart from './useChangeCart';
import { ICartBackend, ICartProduct, ICartProductBackend, IProduct, User } from '../Types';


// utility function to fetch single product from backend
const fetchSingleProduct = async (productId : string) => {
    try {
        const res = await baseRequest.get<IProduct>(`product/${productId}`)
        return res.data
    } catch (error: any) {
        throw Error(error)
    }
}

// utility function to save cart to backend
const saveCart = async (user : User, products : ICartProductBackend[]) => {

    const commentBody ={
        authorId: user.id,
    }
    try {
        const response = await baseRequest.post(`/cart/${user.id}`, { userId : user.id, products}, {
            headers: {
                token: 'Bearer ' + user.accessToken
            }
        })
        
    } catch (error: any) {
        try {
            // if user has already a cart in database => call update route instead
            const response = await baseRequest.put(`/cart/${user.id}`, { userId : user.id, products}, {
                headers: {
                    token: 'Bearer ' + user.accessToken
                }
            })
        } catch (error: any) {
            throw Error(error)
        }
    }
}


// utility function to load cart from backend, triggered after login
const fetchUserCart = async (user: User) => {
 
    try {
        const userCart = await baseRequest.get<ICartBackend[]>(`/cart/find/${user.id}`, {
            headers: {
                token: 'Bearer ' + user.accessToken
            }
        })

        if (userCart.data.length > 0) {
            return userCart.data[0];
        } else {
            return null
        }
        
    } catch (error: any) {
        throw Error(error)
    }
}


export {fetchSingleProduct, saveCart, fetchUserCart}
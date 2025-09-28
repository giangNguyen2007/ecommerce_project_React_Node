import { useContext } from 'react';
import { baseRequest } from '../axios';
import useChangeCart from './useChangeCart';
import {IProduct, IProductComment, User } from '../Types';


// utility function to fetch single product by productId from backend
const fetchSingleProduct = async (productId : string) => {
    try {
        const res = await baseRequest.get<IProduct>(`product/${productId}`)
        debugger;
        return res.data
    } catch (error: any) {
        throw Error(error)
    }
}

// utility function to fetch single product by productId from backend
const fetchtProductComment = async (productId : string) => {
    try {
        const res = await baseRequest.get<IProductComment[]>(`comment/${productId}`)
        return res.data
    } catch (error: any) {
        throw Error(error)
    }
}

// utility function to create new comment
const createProductComment = async (productId : string, user: User, content: string, rating: number) => {
    
    const commentBody ={
        authorId: user.id,
        productId: productId,
        content: content,
        rating: rating
    }
    try {
        const res = await baseRequest.post(`/comment`, 
            // body
            commentBody,
            {
                headers: {
                    token: 'Bearer ' + user.accessToken
                }
        })
        return res.data;

    } catch (error: any) {
        throw Error(error)
    }
}

// fetch all products of one Category
const fetchProductsByCategory = async (category : string) => { 
    try {
        const res = await baseRequest.get<IProduct[]>(`product?category=${category}`)
        return res.data;
    } catch (error: any) {
        throw Error(error)    
    }
}

// fetch all products by title query
const fetchProductsByTitleQuery = async (query : string) => { 
    try {
        const res = await baseRequest.get<IProduct[]>(`product/search/query?title=${query}`)
        debugger;
        return res.data;
    } catch (error: any) {
        throw Error(error)    
    }
}

export {fetchSingleProduct, 
        fetchProductsByCategory, 
        fetchProductsByTitleQuery,
        fetchtProductComment,
        createProductComment}
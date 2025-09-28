
import React, { useContext, useState } from 'react'

import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { baseRequest } from '../axios';
import useChangeCart from './useChangeCart';
import { User } from '../Types';

type LoginDataType = {
    username: String
    email: String
    password: String
}

type AuthAction = "register" | "login"


const useAuth = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const {dispatchAuth} = useContext(AuthContext);
    const {loadUserCart} = useChangeCart();
    const navigate = useNavigate();


    const authenticateUser = async (user : LoginDataType, action : AuthAction): Promise<User> => { 
        setIsLoading(true);
        setError(null);


        try {
            const response = await baseRequest.post<User>(`/auth/${action}`, user) ;
      
            console.log(response.data)

            const responseUser : User = response.data

            setIsLoading(false) ;

            dispatchAuth( { type: 'LOG_IN', payload: responseUser }) ;

            loadUserCart(response.data); 
            return response.data
         
        } catch (error:any) {
            setError(error.response.data.error);
            setIsLoading(false);
            throw Error(error);
        }

     }

  return {authenticate: authenticateUser, isLoading, error}
}

export default useAuth
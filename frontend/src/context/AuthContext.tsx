import { createContext, useState, useReducer, useEffect } from "react";
import { User } from "../Types";

type UserType = {
  user : User | null
}

type ActionType = {
    type : 'LOG_IN' | 'LOG_OUT'
    payload : User | null
}

function AuthReducer(state : UserType, action : ActionType){
    switch(action.type) {
      case "LOG_IN":
        return {
            user: action.payload
        }
      case "LOG_OUT":
        return {
            user : null
        }
      default:
        return state
    }
}

type AuthContextType = {
    user: User | null
    dispatchAuth: React.Dispatch<ActionType>
}

export const AuthContext = createContext<AuthContextType>({user: null, dispatchAuth : () => {}})

type AuthContextProviderProps = {
  children : React.ReactNode
}

export default function AuthContextProvider ({children, } : AuthContextProviderProps) {

  const [state, dispatchAuth] = useReducer(AuthReducer, {user: null})

  return (  
      <AuthContext.Provider value={{ ...state, dispatchAuth : dispatchAuth}}>
          {children}
      </AuthContext.Provider>
  )
}
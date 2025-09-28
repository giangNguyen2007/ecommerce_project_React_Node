import { createContext, useState, useReducer } from "react";
import { ICartProduct } from "../Types";
import { CartReducerAction } from "./CartReducerActionType";

export type CartItem = {
  product : ICartProduct
  quantity: number
}

type CartReducerState = {
  cartItems : CartItem[]
  cartTotal: number,
  cartQuantity: number
}

function CartReducer(state : CartReducerState, action : CartReducerAction) : CartReducerState{
    switch(action.type) {
      case "SET_CART":
        return {
            cartItems: action.payload,
            cartTotal : state.cartItems.reduce(
              (total, cartItem) => total + cartItem.product.price*cartItem.quantity,
              0   // initial value
            ),
            cartQuantity:  state.cartItems.reduce(
              (total, cartItem) => total + cartItem.quantity,
              0   // initial value
            )
        }

      case "ADD_ONE":
        return {
            ...state,
            cartItems: [...state.cartItems, action.payload]
        }
      
      case "UPDATE_ONE":
        return {
            ...state,
            cartItems: state.cartItems.map( 
               cartItem => cartItem.product.key === action.payload.product.key ? action.payload : cartItem
            )
        }
      
      case "CHANGE_QTY":
        return {
            ...state,
            cartItems: state.cartItems.map( 
                cartItem => cartItem.product.key === action.payload.key ? 
                 {...cartItem, quantity : cartItem.quantity + action.payload.delta}
                : cartItem
            )
        }
      
      case "UPDATE_TOTAL_PRICE_AND_QUANTITY":
        return {
            ...state,
            cartTotal: state.cartItems.reduce(
              (total, cartItem) => total + cartItem.product.price*cartItem.quantity, 0 ),
            cartQuantity: state.cartItems.reduce(
              (total, cartItem) => total + cartItem.quantity, 0 )
        }
      
      case "REMOVE_ONE":
        return {
            ...state,
            cartItems: state.cartItems.filter( 
                cartItem => cartItem.product.key !== action.payload.key
            )
        }
        
      case "RESET_NULL":
        return {
            cartItems: [],
            cartTotal: 0,
            cartQuantity: 0
        }

      default:
        return state
    }
  }

type CartContextType = {
  cartItems : CartItem[]
  cartTotal: number
  cartQuantity: number
  dispatchCart : React.Dispatch<CartReducerAction>
}

export const CartContext = createContext<CartContextType>({cartItems : [], cartTotal:0, cartQuantity: 0, dispatchCart : () => {}} )


type CartContextProviderProps = {
  children : React.ReactNode
}

export default function CartContextProvider ({children} : CartContextProviderProps) {

    const [state, dispatchCart] = useReducer(CartReducer, {cartItems: [], cartTotal: 0, cartQuantity: 0})

    return (  
        <CartContext.Provider value={{ ...state, dispatchCart}}>
            {children}
        </CartContext.Provider>
    )
}
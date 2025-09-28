import { CartItem } from "./CartContext"

export type CartReducerAction = ACTION_SETCART | ACTION_ONE | ACTION_UPDATE_PRICE | ACTION_REMOVE | ACTION_CHANGE_QTY | ACTION_RESET_NULL


type ACTION_SETCART = {
    type: "SET_CART"
    payload: CartItem[]
}

type ACTION_ONE = {
    type : "ADD_ONE" | "UPDATE_ONE"
    payload: CartItem
}

type ACTION_CHANGE_QTY = {
    type : "CHANGE_QTY"
    payload: { key: string, delta: number}
}

type ACTION_UPDATE_PRICE = {
    type : "UPDATE_TOTAL_PRICE_AND_QUANTITY"
}

type ACTION_REMOVE = {
    type : "REMOVE_ONE"
    payload: { key : string}
}

type ACTION_RESET_NULL = {
    type : "RESET_NULL"
}
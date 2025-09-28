
export type User = {
    id : string
    username: string
    email: string
    akatsuki: string
    accessToken? : string
}

// product fetched from backend : size and color in array, have not been selected by user
export interface IProduct {
    id : string
    title : string
    desc : string
    img : string
    size: string[]
    color: string[]
    price: number
    comments: {
        rating: number
    }[]
    favorByUserIds: string[]
    lastVisitedByUserIds: string[]

}

export interface IProductComment {
    id : string
    content : string
    rating:number
    authorId: string
    author : {
        username: string
    }
}

// product in cart : size and color have been selected and no longer in Array, key property added
export interface ICartProduct {
    id : string
    key: string
    title : string
    img : string
    size: string
    color: string
    price: number
}

// product in cart saved in backend DB, including also quantity
export interface ICartProductBackend {
    productId : string
    key: string
    size: string
    color: string
    quantity: number
}

// cart data per user , received from backend
export interface ICartBackend {
    userId : string
    products : ICartProductBackend[]
}
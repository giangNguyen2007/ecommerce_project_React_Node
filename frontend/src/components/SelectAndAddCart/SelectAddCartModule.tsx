import './SelectAddCartModule.css'
import React, {useContext} from 'react'
import { useState} from 'react'
import Selector from '../Selector/Selector'
import ColorAndSizeSelector from './ColorAndSizeSelector'
import { IProduct } from '../../Types'
import useQuantity from '../../customHooks/useQuantity'
import useChangeCart from '../../customHooks/useChangeCart'
import {AuthContext} from "../../context/AuthContext";

const SelectAddCart = ({product} : {product : IProduct}) => {

    const {user} = useContext(AuthContext);
    const [selectColor, setSelectColor] = useState<string | null>(null);
    const [selectSize, setSelectSize] = useState<string | null>(null);
    const {quantity, setQuantity, handleQuantity} = useQuantity();
    const {addItemToCart} = useChangeCart();


    const handleAddCart = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => { 
        // add to cart the product with specified color and size
        if (selectColor && selectSize) {
            addItemToCart(product, quantity, selectColor, selectSize);
        }
        setQuantity(1);
    }

  return (

    <div className='select-add-cart-wrapper'>
        <ColorAndSizeSelector
            colorArray={product.color}
            sizeArray={product.size}
            setSelectColor = {setSelectColor}
            setSelectSize = {setSelectSize}
        />

        <div className='add-cart-container' >

            <div className="amount-cont">
                <div className="plus-minus" onClick={(e) => handleQuantity('Plus')}>+</div>
                <div className="product-quantity" > {quantity} </div>
                <div className="plus-minus"  onClick={(e) => handleQuantity('Minus')}>-</div>
            </div>

            <button 
                    onClick={handleAddCart}
                    className="add-cart-btn" 
                    disabled = {!user || !selectColor || !selectSize}>
                Add Cart
            </button>
        </div>
    </div>
    
  )
}

export default SelectAddCart
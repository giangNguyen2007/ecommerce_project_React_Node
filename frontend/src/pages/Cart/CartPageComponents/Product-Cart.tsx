import './Product-Cart.css'
import React, { useContext } from 'react'
import { DeleteForeverOutlined, DeleteOutlined } from '@material-ui/icons';
import { ICartProduct } from '../../../Types';
import useChangeCart from '../../../customHooks/useChangeCart';
import { CartContext } from '../../../context/CartContext';

const ProductCart = ({product, quantity, key} : {product : ICartProduct, quantity : number, key: string}) => {

  const {removeItemFromCart} = useChangeCart();
  const {cartItems, cartTotal, dispatchCart} = useContext(CartContext);


  const handlePlus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { 
     dispatchCart( {type: 'CHANGE_QTY', payload:{ key: product.key, delta: 1}})
     dispatchCart({type: 'UPDATE_TOTAL_PRICE_AND_QUANTITY'})
  }

  const handleMinus = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { 
    if (quantity > 1) {
      dispatchCart( {type: 'CHANGE_QTY', payload:{ key: product.key, delta: -1}})
      dispatchCart({type: 'UPDATE_TOTAL_PRICE_AND_QUANTITY'})
    }
  }

  const handleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { 
      removeItemFromCart(product.key);
  }

  return (
    <div className="com-product-cart">
        <img
            src={product.img} 
        />
        <div className="detail-wrapper">
            <div> <b>Product: </b> {product.title}</div>
            {/* <div> <b>ID: </b> {product._id}</div> */}
            <div> <b>Color: </b> {product.color}</div>
            <div> <b>Size: </b> {product.size}</div>
        </div>
        <div className="price-wrapper">
           <div className="quantity-wrapper">
              <div className='plus-minus' onClick={ handlePlus}> + </div>
              <div className='product-quantity'> {quantity} </div>
              <div className='plus-minus' onClick={ handleMinus}> - </div>
           </div>

            <div className='price'>€ {product.price * quantity}</div>

            <div className="delete-wrapper">
              <div className="delete"
                  onClick={handleDelete}>
                  <DeleteOutlined />
              </div>
            </div>
        </div>

    </div>
  )
}

export default ProductCart
import './ProductCard.css'
import React from 'react'
import { Link } from 'react-router-dom'
// import SelectAddCart from '../../../components/SelectAndAddCart/SelectAddCartModule'
import { IProduct } from '../../Types'
import SelectAddCart from '../SelectAndAddCart/SelectAddCartModule'

type ProductCardProps = {
    product : IProduct
    key: string
}


const ProductCardSimple = ( {product, key} : ProductCardProps) => {

  return (
    <div className="product-card">
       
            <img 
                className='product-img'
                src={product.img} />
            
            <Link className='title' to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <div className="text-xs text-slate-700">
                    {product.title}
                </div>
            </Link>

            <div className="info-product">
                <div className="upper-wrapper">
                    <div className="price">
                        € {product.price}
                    </div>
                </div>
            </div>    
      
    </div>
    )
}

export default ProductCardSimple;
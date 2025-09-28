import './ProductCard.css'
import React from 'react'
import { Link } from 'react-router-dom'
// import SelectAddCart from '../../../components/SelectAndAddCart/SelectAddCartModule'
import { IProduct } from '../../Types'
import SelectAddCart from '../SelectAndAddCart/SelectAddCartModule'
import RatingAndComments from '../RatingAndComments/RatingAndComments'

type ProductCardProps = {
    product : IProduct
}


const ProductCard = ( {product} : ProductCardProps) => {

    const avg_rating = product.comments.reduce((total , comment) => total + comment.rating, 0)/ product.comments.length

  return (
    <div className="product-card">
            <RatingAndComments rating={avg_rating} nbComments={product.comments.length} ratingSize='small' />
       
            
            
            <Link className='title' to={`/product/${product.id}`}>
                <img 
                    className='product-img'
                    src={product.img} />
                    
                <div className="product-title">
                    {product.title}
                </div>
            </Link>

            <div className="info-product">
                <div className="upper-wrapper">
                    <div className="price">
                         {product.price}€
                    </div>
                </div>

                <SelectAddCart product={product} />
            </div>    
      
    </div>
    )
}

export default ProductCard
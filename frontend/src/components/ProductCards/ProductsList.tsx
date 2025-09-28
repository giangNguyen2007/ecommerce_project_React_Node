import React, { useEffect, useState } from 'react'
import './ProductsList.css';
import ProductCard from './ProductCard'
import axios from 'axios'
import { adminRequest } from '../../axios'
import { IProduct } from '../../Types';

type ProductListProps = {
    products : IProduct[]
}

const ProductsList = ({products} : ProductListProps) => {

    console.log("product list component rerender");
    
  return (
    <div className="products-container">
        {products.map(
            product => (<ProductCard product={product} key={product.id} />)
        )}
    </div>
    )
}

export default ProductsList
import './CategoryPage.css'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductsList from '../../components/ProductCards/ProductsList';
import Selector from '../../components/Selector/Selector';
import { IProduct } from '../../Types';
import { fetchProductsByTitleQuery } from '../../customHooks/productAPI';


const UserPage = () => {
    const location = useLocation();
    const [products, setProducts] = useState<IProduct[]>([]);
    const searchQuery = location.pathname.split("/")[3];
 
    

  return (
    <div className='search-Page'>
        <h1> Usre Page</h1>
        
    </div>
  )
}

export default UserPage;
import './SearchPage.css'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductsList from '../../components/ProductCards/ProductsList';
import Selector from '../../components/Selector/Selector';
import { IProduct } from '../../Types';
import { fetchProductsByTitleQuery } from '../../apiServices/productAPI';


const SearchPage = () => {
    const location = useLocation();
    const [products, setProducts] = useState<IProduct[]>([]);
    const searchQuery = location.pathname.split("/")[3];
 
    useEffect( () => {
        const fetchProducts = async () => { 
            try {
                    const fetchedProducts = await fetchProductsByTitleQuery(searchQuery);
                    debugger;
                    setProducts(fetchedProducts);

            } catch (error) {
                console.log(error)    
            }
        }
        fetchProducts();
    }, [searchQuery])

  return (
    <div className='search-Page'>
        <h1> Search result {searchQuery}</h1>
        <ProductsList products={products}/>
    </div>
  )
}

export default SearchPage;
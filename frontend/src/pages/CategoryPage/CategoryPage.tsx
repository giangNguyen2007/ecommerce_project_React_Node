import './CategoryPage.css'
import React, { useEffect, useState } from 'react'
import ProductsList from '../../components/ProductCards/ProductsList'
import { useLocation } from 'react-router-dom'
import Selector from '../../components/Selector/Selector'
import { categoriesData } from '../../data'
import { adminRequest } from '../../axios'
import { IProduct } from '../../Types'
import { fetchProductsByCategory } from '../../customHooks/productAPI'
import ProductsListCarousel from '../../components/ProductCards/ProductsListCarousel'
import SelectorPanel from '../../components/Selector/SelectorPanel'
import { debug } from 'console'

const CategoryPage = () => {
    const location = useLocation();
    const title = location.pathname.split("/")[2];
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);
    const [colorFilter, setColorFilter] = useState<string>("all")
    const [sizeFilter, setSizeFilter] = useState<string>("all")

    const category = categoriesData.find( item => item.title === title)

    // fetch products of the category
    useEffect( () => {
        const fetchProducts = async () => { 
            
            try {
                if(category !== undefined){
                    const fetchedProducts = await fetchProductsByCategory(category?.cat);
                    console.log(fetchedProducts)
                    setProducts(fetchedProducts);
                }

            } catch (error) {
                console.log(error)    
            }
        }
        fetchProducts();
    }, [category])


    // filter product 
    // called after each filter value change, or product sorting
    useEffect(() => {

        let filtered = products;

        if ( products.length > 0){
            
            if (colorFilter !== "all") {
                filtered = filtered.filter(
                    (product) => product.color.includes(colorFilter) 
                )
            }
            
            if (sizeFilter !== "all") {
                filtered = filtered.filter(
                    (product) => product.size.includes(sizeFilter)
                )
            } 
        }

        setFilteredProducts(filtered) ; 
     
    }, [colorFilter, sizeFilter, products])
    
    const handleSizeSelect = (value : string) => { 
        if (value === 'all') {
            setSizeFilter("all");
        } else {
            setSizeFilter(value);
        }
     }

    const handleColorSelect = (value: string) => { 
        if (value === 'all') {
            setColorFilter("all");
        } else {
            setColorFilter(value);
        }
    }

    const handleSortByPrice = (direction: string) => { 
        function compareByPrice(a : IProduct, b: IProduct) {
            return a.price - b.price;
        }

        if (direction === 'ascending') {
            // let sortedFiltered = JSON.parse(JSON.stringify(filteredProducts));
            // sortedFiltered.sort(compareByPrice);
            // setFilteredProducts(sortedFiltered);

            let sortedAll = JSON.parse(JSON.stringify(products));
            sortedAll.sort(compareByPrice);
            setProducts(sortedAll);
        } else if  (direction === 'descending'){
            // let sortedFiltered = JSON.parse(JSON.stringify(filteredProducts));
            // sortedFiltered.sort(compareByPrice).reverse();
            // setFilteredProducts(sortedFiltered);

            let sortedAll = JSON.parse(JSON.stringify(products));
            sortedAll.sort(compareByPrice).reverse();
            setProducts(sortedAll);
        }
    }
  
  return (
    <div className='prod-category-wrapper'>
        {/* <h1> Category : {title} </h1> */}

        <div className="flex">

            <div className="left-section">
                <div>Filter by </div>
                <SelectorPanel 
                        title="Color" 
                        dataArray={category?.colorArray} 
                        handleChange={handleColorSelect}
                        currentSelectedColor={colorFilter}
                        styleClass='color-circle'
                />

                <SelectorPanel 
                        title="Size" 
                        dataArray={category?.sizeArray} 
                        handleChange={handleSizeSelect}
                        currentSelectedColor={sizeFilter}
                        styleClass='text-item'
                />
            </div>

            <div className="right-section">
                <div className="sort-container">
                    <div>Sort by price: </div>
                    <select className="sort-selector" onChange={e => handleSortByPrice(e.target.value)}>
                        <option>none</option>
                        <option>ascending</option>
                        <option>descending</option>
                    </select> 
                </div>

                <ProductsList products={filteredProducts}/>
            </div>

        </div>

        
        {/* <ProductsListCarousel products={filteredProducts}/> */}
    </div>
  )
}

export default CategoryPage
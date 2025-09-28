import React from 'react';
import './CategoryList.css';
import { categoriesData } from '../../../data';
import {Link } from 'react-router-dom';

const CategoryList = () => {
  return (
    <div className='category-container'>
        {categoriesData.map( (item, index) =>
            <CategoryCard item={item} key={index} />
        )}
    </div>
  )
}

type ItemType = {
  title : string
  cat: string
  colorArray: string[]
  sizeArray: string[]
  image: string
}

const CategoryCard = ({item} : {item : ItemType}) => {
  return (
    <>
      <Link to={`/list/${item.title}`}>
        <div className='category-card'>
            <button> {item.title + ' >'}  </button>
            <div className="image-wrapper">
              <img src= {item.image}/>
            </div>
        </div>
      </Link>
    </>
 
  
  )
}

export default CategoryList
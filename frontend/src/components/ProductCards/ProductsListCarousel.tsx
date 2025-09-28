import React, { useEffect, useRef, useState } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'
import { adminRequest } from '../../axios'
import { IProduct } from '../../Types';
import ProductCardSimple from './ProductCardSimple';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';

type ProductListProps = {
    products : IProduct[]
}

const ProductsListCarousel = ({products} : ProductListProps) => {

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const oneSlideRef = useRef<HTMLDivElement | null>(null);
    const [slideNumber, setSlideNumber]= useState<number>(1);

    console.log("product list component rerender");

    const handleRightClick = () => {
        if(sliderRef.current!= null && slideNumber < 4){

            const distance = sliderRef.current?.getBoundingClientRect().x;
            const slideWidth = 270;

            sliderRef.current.style.transform = `translateX(${-slideWidth*slideNumber}px`;
            setSlideNumber(slideNumber + 1 );
        }
    }
    const handleLeftClick = () => {
        debugger;
        if(sliderRef.current!= null && slideNumber > 1){
            
            const distance = sliderRef.current?.getBoundingClientRect().x;
            const slideWidth = 270;

            sliderRef.current.style.transform = `translateX(${distance + slideWidth}px`;
            setSlideNumber(slideNumber - 1 );
        }
    }
    
  return (
    <div className="relative">
        <div className="m-4">slideNum {slideNumber}</div>
        <div className="m-4">distance {slideNumber}</div>
        <div className="m-4">width {slideNumber}</div>
        <div className="absolute  bg-slate-400 z-10" id="left-arrow" onClick={(e) => handleLeftClick()}>
            <ArrowLeftOutlined />
        </div>

        <div className="absolute z-10" id="right-arrow" onClick={(e) => handleRightClick()}>
            <ArrowRightOutlined />
        </div>

        <div className="flex gap-2.5 overflow-visible" ref={sliderRef}>
            {products.map(
                product => (<ProductCardSimple product={product} key={product.id} />)
            )}
        </div>

       
    </div>
    )
}

export default ProductsListCarousel;
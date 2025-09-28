import './Slider.css';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import {useRef, useState} from 'react';
import { Link } from 'react-router-dom';

const Slider = () => {

    const sliderRef = useRef<HTMLDivElement | null>(null);
    const oneSlideRef = useRef<HTMLDivElement | null>(null);
    const [slideNumber, setSlideNumber]= useState<number>(1);

    const handleRightClick = () => {
        if(sliderRef.current!= null && oneSlideRef.current!= null && slideNumber < 2){

            const distance = sliderRef.current?.getBoundingClientRect().x;
            const slideWidth = oneSlideRef.current?.getBoundingClientRect().width;

            sliderRef.current.style.transform = `translateX(${-distance - slideWidth}px`;
            setSlideNumber(slideNumber + 1 );
        }
    }
    const handleLeftClick = () => {

        if(sliderRef.current!= null && oneSlideRef.current!= null && slideNumber > 1){
            
            const distance = sliderRef.current?.getBoundingClientRect().x;
            const slideWidth = oneSlideRef.current?.getBoundingClientRect().width;

            sliderRef.current.style.transform = `translateX(${distance + slideWidth}px`;
            setSlideNumber(slideNumber - 1 );
        }
    }

  return (
    <div className="slider">
        <div className="arrow-cont" id="left-arrow" onClick={(e) => handleLeftClick()}>
            <ArrowLeftOutlined />
        </div>

        <div className="arrow-cont" id="right-arrow" onClick={(e) => handleRightClick()}>
            <ArrowRightOutlined />
        </div>

        <div className="slide-wrapper" ref={sliderRef}>
            <div className="slide" >
                <Link to={`/product/653234852c518659d50aac4c`}>
                    <div className="img-container">
                        <img src="https://www.futbolemotion.com/imagesarticulos/169377/grandes/bota-nike-mercurial-superfly-8-elite-fg-gris-0.webp" />
                    </div>
                </Link>
                
                <div className="info-container">
                    <div className='section-title'>Winter Sales</div>
                    
                    <p>Nike Mercurial Superfly 8 Elite FG </p>

                    <Link to={`/product/653234852c518659d50aac4c`}>
                        <button>SHOP NOW</button>
                    </Link>
                </div>
            </div>

            <div className="slide" ref={oneSlideRef}>
                <Link to={`/product/6530ed1d2c518659d50aa99a`}>
                    <div className="img-container">
                        <img src="https://www.casalsport.com/img/W/CAS/ST/FB/31/09/FB3109/FB3109_ST.jpg" />
                    </div>
                </Link>
                
                <div className="info-container">
                    <div className='section-title'>Winter Sales</div>
                    
                    <p>Ballon Al Rihla Coupe du Monde 2022 </p>

                    <Link to={`/product/6530ed1d2c518659d50aa99a`}>
                        <button>SHOP NOW</button>
                    </Link>
                </div>
            </div>
        </div>


    </div>
  )
}

export default Slider
import React from 'react'
import Selector from '../Selector/Selector'
import './ColorAndSizeSelector.css'

type ComponentProps = {
    colorArray: string[]
    sizeArray: string[]
    setSelectColor: React.Dispatch<React.SetStateAction<string | null>>
    setSelectSize: React.Dispatch<React.SetStateAction<string | null>>
}

const ColorAndSizeSelector = ({colorArray, sizeArray, setSelectColor, setSelectSize} : ComponentProps) => {
    
    const colorCircleStyle = {
        background:'white',
        width:'10px',
        height:'10px',
        border: '0.5px solid grey'
    }

    return (
    <div className="color-size-selector-wrapper">
        <div className="color-palette" >        
            <span >Color</span>
            {colorArray? colorArray.map(
                (color, index) => (<div className="color-cercle" style={{...colorCircleStyle, background:color}} key={index}  > </div> )
            ) : null}
        </div>

        {/* <div className="size-palette" >        
            <span >Color</span>
            {sizeArray? sizeArray.map(
                (size) => (<div> {size}</div> )
            ) : null}
        </div> */}

        <div className="select-wrapper">
            <span >Select</span>
            <Selector   title='color' dataArray={colorArray} handleChange={setSelectColor} />
            <Selector title='size' dataArray={sizeArray} handleChange={setSelectSize}  />
        </div>
    </div>
  )
}

export default ColorAndSizeSelector
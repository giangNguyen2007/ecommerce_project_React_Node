import React, { useState } from 'react'
import './SelectorPanel.css'

type SelectorProps = {
  title: string
  dataArray: string[] | undefined
  handleChange: (value: string) => void
  currentSelectedColor: string
  styleClass: "color-circle" | "text-item"
}

type SelectItemProps = {
  active: boolean
  value: string
  styleClass: "color-circle" | "text-item"
  handleSelect: (value: string) => void
}

const SelectorPanel = ( {title, dataArray, handleChange, currentSelectedColor, styleClass}: SelectorProps) => {

  return (
     <div className="seclector-panel-wrapper">
            <div>{title}</div>
            <div className={`${styleClass}-wrapper`}>
                { dataArray ? dataArray.map( (item, index) =>
                  item == 'all' ?
                  <SelectItem
                        key={index}
                        active={item===currentSelectedColor}
                        value={item} 
                        styleClass= {"text-item"}
                        handleSelect={handleChange} 
                  />
                  :
                  <SelectItem
                        key={index}
                        active={item===currentSelectedColor}
                        value={item} 
                        styleClass= {styleClass}
                        handleSelect={handleChange} 
                  />
                ): null}
            </div>
     </div>  

  )
}

const SelectItem = ( {active, value, styleClass, handleSelect}: SelectItemProps) => {
  return (
      <div 
          className={active? `${styleClass} active` : `${styleClass}`} style={{backgroundColor:`${value}`}}
          onClick= {e => handleSelect(value)} 
      >
        {value}
      </div>
  )
}

export default SelectorPanel
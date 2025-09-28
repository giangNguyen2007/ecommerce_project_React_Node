import React from 'react'

type SelectorProps = {
  title: string
  dataArray: string[] | undefined
  handleChange: (value: string) => void
}

const Selector = ( {title, dataArray, handleChange}: SelectorProps) => {
  return (
    <select onChange = {e => handleChange(e.target.value)}>

        {/*<option disabled style={{width:'15px'}}  key={0} value="">{title}</option>*/}

        { dataArray ? dataArray.map( (item, index) =>
            <option key={index} style={{width:'15px'}}>{item}</option>
        ): null}
        
    </select> 
  )
}

export default Selector
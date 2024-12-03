/* eslint-disable no-unused-vars */
import React from 'react'
import './Square.css'
import cross1 from '../assets/equis o.png'
import circle2 from '../assets/circulo k.png'

// eslint-disable-next-line no-unused-vars, react/prop-types
export const Square = ({value, onClick, }) => {

  
  return (
    <div className='square' onClick={onClick}>
    {value === 'X' && <img src={cross1} alt="Cross" className='icon' />}
    {value === 'O' && <img src={circle2} alt="Circle" className='icon' />}
  </div>
);
};
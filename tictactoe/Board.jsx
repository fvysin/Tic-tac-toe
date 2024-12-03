/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import './Board.css'
import { useState } from 'react'
import { Square } from './Square'
import Confetti from 'react-confetti'
import Elefante from '../assets/elephant-6087079_1280.webp'

export const Board = () => {

  const [turn, setTurn]= useState('X')
  //empieza siempore la x
  const [squares, setSquares]= useState(Array(9).fill(null))
  //para que aranque el cuadrado sin nada, sin valor
  const [status, setStatus]=useState("Playing")
  const [puntuacion, setPuntuacion]= useState({X:0, O:0})
  const [showConfetti, setShowConfetti]= useState(false)

  
  const checkForWinner= (squares) =>{
    const winningCombinations= [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    const results = winningCombinations.map(([a, b, c]) => 
      squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ? squares[a] : null
    );
  
    const winner = results.find(result => result);
  
    if (winner) {
      setStatus(`${winner} Wins!`);
      setPuntuacion({ ...puntuacion, [winner]: puntuacion[winner] + 1 });
      setShowConfetti(true);
      return;
    }
  
    if (squares.every(square => square !== null)) {
      setStatus("Draw!");
    }
  };


  const handleClick = (index) => {
    if (squares[index] || status !== "Playing") return;
    const newSquares = [...squares];
    newSquares[index] = turn;
    setSquares(newSquares);
    checkForWinner(newSquares);
    setTurn(turn === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setTurn("X");
    setStatus("Playing");
    setShowConfetti(false)
  };
    


    const createSquare=values => (
      values.map(value=>(
        <Square 
        key={value} 
        value={squares[value]} 
        onClick={()=>handleClick(value)}
  
        />
      ))
    )
    return (
<div className='container'>
  <h1 className='title'>TIC TAC TOE by <span>FLOR</span></h1>

  <div className='board'>
    <div className='row'>{createSquare([0, 1, 2])}</div>
    <div className='row'>{createSquare([3, 4, 5])}</div>
    <div className='row'>{createSquare([6, 7, 8])}</div>
  </div>

  {/* ASI SE PASA LA RENDERIZACION DEL ESTADO PARA QUE SE VEA EL 'PLAYING', 'X GANA' */}

  <h2   className={`estados turn ${turn}`}>
  {status === "Playing" ? `Turn: ${ turn}` : status}
  </h2>

  <h2 className='estados'>
  Score: ❌ = {puntuacion.X} | ⭕️ = {puntuacion.O}
</h2>
  <button 
   className='button'
    onClick={handleReset}>
    Reset
    </button>
{showConfetti && <Confetti className='confetti'/>}
<footer className='footer'>Technologies used: JavaScript, React Js, Vite, HTML, CSS</footer>
</div>
  )
}

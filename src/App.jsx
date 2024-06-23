import { useState } from 'react'

function Square({ value, onSquareClick }) {
  return <button className='square' onClick={onSquareClick}>
    {value}
  </button>
}

function Board({ xIsNext, squares, onPlay, xWinner }) {

  function handleClick(i) {
    if (squares[i] || decideWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSquares)
  }

  const winner = decideWinner(squares);
  let status = ''
  if (winner) {
    const squareComponentList = document.getElementsByClassName('board')[0].childNodes  
    squareComponentList[winner[1]].style.backgroundColor = 'yellow'
    squareComponentList[winner[2]].style.backgroundColor = 'yellow'
    squareComponentList[winner[3]].style.backgroundColor = 'yellow'   
    status = `Winner : ${winner[0]}`
  } else {
    status = `Next player : ${(xIsNext ? 'X' : 'O')}`
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board'>
        {/* pembungkusan handleClick untuk menghindari rerender */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} pWinner={xWinner[0]} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} pWinner={xWinner[1]}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} pWinner={xWinner[2]}/>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} pWinner={xWinner[3]}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} pWinner={xWinner[4]}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} pWinner={xWinner[5]}/>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} pWinner={xWinner[6]}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} pWinner={xWinner[7]}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} pWinner={xWinner[8]}/>
      </div>
    </>
  )
}

function decideWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]    
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return [squares[a], a, b, c]      
    }
  }

  return false
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [winnerFlag, setWinnerFlag] = useState([Array(9).fill('orange')])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
    const squareComponentList = document.getElementsByClassName('board')[0].childNodes
    squareComponentList[0].style.backgroundColor = 'white'
    squareComponentList[1].style.backgroundColor = 'white'
    squareComponentList[2].style.backgroundColor = 'white'
    squareComponentList[3].style.backgroundColor = 'white'
    squareComponentList[4].style.backgroundColor = 'white'
    squareComponentList[5].style.backgroundColor = 'white'
    squareComponentList[6].style.backgroundColor = 'white'
    squareComponentList[7].style.backgroundColor = 'white'
    squareComponentList[8].style.backgroundColor = 'white'
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  const moves = history.map((squares, move) => {
    let description = ''
    if (move > 0) {
      description = `Go to move # ${move}`
    } else {
      description = `Go to game start`
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} xWinner={winnerFlag} />
      </div>
      <div className='game-info'>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )
}
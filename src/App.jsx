import { useState } from 'react'

function Square({ value, onSquareClick, aColor }) {
  return <button className='square' onClick={onSquareClick} style={{ backgroundColor: aColor }}>
    {value}
  </button>
}

function Board({ xIsNext, squares, onPlay }) {
  const myColor = Array(9).fill('white')
  
  function handleClick(i) {

    if (squares[i] || decideWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O'

    onPlay(nextSquares)
  }

  const winner = decideWinner(squares);
  let status = ''
  if (winner) {
    status = `Winner : ${winner[0]}`
    myColor[winner[1]] = 'yellow'
    myColor[winner[2]] = 'yellow'
    myColor[winner[3]] = 'yellow'
  } else {
    myColor[0] = 'white'
    myColor[1] = 'white'
    myColor[2] = 'white'
    myColor[3] = 'white'
    myColor[4] = 'white'
    myColor[5] = 'white'
    myColor[6] = 'white'
    myColor[7] = 'white'
    myColor[8] = 'white'
    status = `Next player : ${(xIsNext ? 'X' : 'O')}`
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board'>
        {/* pembungkusan handleClick untuk menghindari rerender */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} aColor={myColor[0]} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} aColor={myColor[1]} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} aColor={myColor[2]} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} aColor={myColor[3]} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} aColor={myColor[4]} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} aColor={myColor[5]} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} aColor={myColor[6]} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} aColor={myColor[7]} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} aColor={myColor[8]} />
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
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
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
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )
}
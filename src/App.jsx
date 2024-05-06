import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./Winning-Combination"
import GameOver from "./components/GameOver"


const initialGameBoard = [
  [null , null , null ] , 
  [null , null , null ] ,
  [null , null , null ] 
  ]

// helper function ()

// helper function for the derived board
function derivedGameBoard(gameTurns){

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for(const turn of gameTurns){
      const {square , player} = turn;
      const {row , col} = square;
      gameBoard[row][col] = player
  }
  return gameBoard;

}
// end function 

// function to find out the current player 
function derivedActivePlayer(gameTurns){
  let currentPlayer = "x"

  if( gameTurns.length > 0 &&  gameTurns[0].player ==="x") {
    currentPlayer = "o"
  }

  return currentPlayer
}

// loginc for winning 
function derivedWinner(gameBoard , players){
  let winner = null;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol= gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol= gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){

      winner  = players[firstSquareSymbol];

    }

  }

  return winner;

}

// main  function
function App() {

  const [players , setPlayers] = useState({
    x:'player 1',
    o:'player 2',
  })

  const [gameTurns , setGameTurns] = useState([])
  // const [hasWinner , setHasWinner] = useState(false)
  // const [activePlayer, setActivePlayer] = useState("x")



  const activePlayer = derivedActivePlayer(gameTurns)

  // code to be chnagd 
  const gameBoard =  derivedGameBoard(gameTurns) 
  // changes made 

  const winner = derivedWinner(gameBoard , players);

  
  const hasDraw  = gameTurns.length === 9 && !winner

   const  handleSelectSquare = (rowIndex , colIndex) =>{
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'x' ? 'o' : 'x')
    setGameTurns(prevTurns => {

      const currentPlayer = derivedActivePlayer(prevTurns)

      const updatedTurns = [ {square:{row:rowIndex , col: colIndex}, player: currentPlayer},...prevTurns,]

      return updatedTurns;

    })
   }


   function handleRestart() {
    setGameTurns([])
   }

   function handlePlayerNameChange(symbol , newName){
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]: newName
      }
    })

   }


  return (
    <main>
      <div id = "game-container">
      <ol id="players" className="highlight-player">
       <Player initialName = "player 1" symbol = "x" isActive={activePlayer === 'x'} onChangeName = {handlePlayerNameChange}/>
       <Player initialName = "player 2" symbol = "o" isActive={activePlayer === 'o'} onChangeName = {handlePlayerNameChange}/>
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart = {handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare}
        board = {gameBoard}
       />
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App

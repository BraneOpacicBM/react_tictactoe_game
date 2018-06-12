import React, { Component } from 'react';
import Circle from './components/Circle/Circle';
import Cross from './components/Cross/Cross';
import Button from './components/Button/Button';
import Headline from './components/Headline/Headline';
import WhichTurn from './components/WhichTurn/WhichTurn';

import './App.css';

class App extends Component {

  state = {
    board: Array(9).fill(""),
    playerTurn: "X",
    message: "It's X's turn!",
    playableGame: true,
    winningPosition: []
  }
  componentDidMount() {
    const cellPieces = [...document.getElementsByClassName("cell")];
    for(let i = 0; i < cellPieces.length; i++) {
      cellPieces[i].addEventListener("click", (e) => {

       let boardItems = [...this.state.board];
       if(boardItems[i] === "" && this.state.playableGame) {
        boardItems[i] = this.state.playerTurn;
        this.setState(prevState => {
          return {
            board: boardItems,
            playerTurn: prevState.playerTurn === "X" ?  "O" : "X",
            message: prevState.message === "It's X's turn!" ? "It's O's turn!" : "It's X's turn!"
          }
        })
        this.checkForWinner(this.state.board)
       }    
      })
    }
  }

  buttonReset = () => {
    this.setState({
      board: Array(9).fill(""),
      playerTurn: "X",
      message: "It's X's turn!",
      playableGame: true,
      winningPosition: []
    })
   
  }

  checkForWinner = (board) => {


    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        this.setState({
          message: board[a] + " is the winner!",
          playableGame: false,
          winningPosition: [a, b, c]
        })
      } else  {
        if([].concat(board).sort().reverse().pop() !== "") {
          this.setState({
            message: "It's a draw!"
          })
        }
      }
    }
    return null;

  }

  render() {

    let boardCells = this.state.board.map((cell, i) => {
      if(!this.state.playableGame) {
        return <div key={i} className={this.state.winningPosition.includes(i) ? "cell winningCell" : "cell"} data-cell={i}>{this.state.board[i] !== "" ? (this.state.board[i] === "X" ? <Cross alt="cross" /> : <Circle alt="circle" /> ) : null}</div>
      } else {
        return <div key={i} className="cell" data-cell={i}>{this.state.board[i] !== "" ? (this.state.board[i] === "X" ? <Cross alt="cross" /> : <Circle alt="circle" /> ) : null}</div>
      }
    })

    return (
      <div className="mainContentWrapper">
        <div className="innerWrapper">
          <div id="board-game">
            <div className="playableArea">
              <Headline
              tic="Tic"
              tac="Tac"
              toe="Toe"
              game="game!"
              />
              <WhichTurn>{this.state.message}</WhichTurn>
              <div className="board">
                {boardCells}
              </div>
              <Button buttonReset={this.buttonReset}>- RESET -</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

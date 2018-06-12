import React, { Component } from 'react';
import Circle from './components/Circle/Circle';
import Cross from './components/Cross/Cross';
import Button from './components/Button/Button';
import Headline from './components/Headline/Headline';
import WhichTurn from './components/WhichTurn/WhichTurn';

import './App.css';

class App extends Component {

  state = {
    board: ["", "", "",
            "", "", "",
            "", "", ""],
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
      board: ["", "", "",
              "", "", "",
              "", "", ""],
      playerTurn: "X",
      message: "It's X's turn!",
      playableGame: true,
      winningPosition: []
    })
   
  }

  checkForWinner = (board) => {

    if(board[0] !== "" && board[0] === board[1] && board[0] === board[2]){
      this.setState({
        message: board[0] + " is the winner!",
        playableGame: false,
        winningPosition: [0, 1, 2]
      })
    } else if(board[3] !== "" && board[3] === board[4] && board[3] === board[5]){
      this.setState({
        message: board[3] + " is the winner!",
        playableGame: false,
        winningPosition: [3, 4, 5]
      })
    } else if(board[6] !== "" && board[6] === board[7] && board[6] === board[8]){
      this.setState({
        message: board[6] + " is the winner!",
        playableGame: false,
        winningPosition: [6, 7, 8]
      })
    } else if(board[0] !== "" && board[0] === board[3] && board[0] === board[6]){
      this.setState({
        message: board[0] + " is the winner!",
        playableGame: false,
        winningPosition: [0, 3, 6]
      })
    } else if(board[1] !== "" && board[1] === board[4] && board[1] === board[7]){
      this.setState({
        message: board[1] + " is the winner!",
        playableGame: false,
        winningPosition: [1, 4, 7]
      })
    } else if(board[2] !== "" && board[2] === board[5] && board[2] === board[8]){
      this.setState({
        message: board[2] + " is the winner!",
        playableGame: false,
        winningPosition: [2, 5, 8]
      })
    } else if(board[0] !== "" && board[0] === board[4] && board[0] === board[8]){
      this.setState({
        message: board[0] + " is the winner!",
        playableGame: false,
        winningPosition: [0, 4, 8]
      })
    } else if(board[2] !== "" && board[2] === board[4] && board[2] === board[6]){
      this.setState({
        message: board[2] + " is the winner!",
        playableGame: false,
        winningPosition: [2, 4, 6]
      })
    } else  {
      if([].concat(board).sort().reverse().pop() !== "") {
        this.setState({
          message: "It's a draw!"
        })
      }
    }
  }

  render() {

    let boardCells = this.state.board.map((cell, i) => {
      if(!this.state.playableGame) {
        return <div key={i} className={this.state.winningPosition.includes(i) ? "cell winningCell" : "cell"} data-cell={i}>{this.state.board[i] !== "" ? (this.state.board[i] === "X" ? <Cross /> : <Circle /> ) : null}</div>
      } else {
        return <div key={i} className="cell" data-cell={i}>{this.state.board[i] !== "" ? (this.state.board[i] === "X" ? <Cross /> : <Circle /> ) : null}</div>
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

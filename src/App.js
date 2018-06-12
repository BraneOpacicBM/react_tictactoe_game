import React, { Component } from 'react';
import './App.css';
import Circle from './components/Circle/Circle';
import Cross from './components/Cross/Cross';
import Button from './components/Button/Button';

class App extends Component {

  state = {
    board: ["", "", "",
            "", "", "",
            "", "", ""],
    playerTurn: "X",
    message: "It's X's turn!"
  }
  componentDidMount() {
    const cellPieces = [...document.getElementsByClassName("cell")];
    for(let i = 0; i < cellPieces.length; i++) {
      cellPieces[i].addEventListener("click", (e) => {

       let boardItems = [...this.state.board];
       if(boardItems[i] === "") {
        boardItems[i] = this.state.playerTurn;
        this.setState(prevState => {
          return {
            board: boardItems,
            playerTurn: this.state.playerTurn === "X" ?  "O" : "X",
            message: this.state.message === "It's X's turn!" ? "It's O's turn!" : "It's X's turn!"
          }
        })
        this.checkForWinner(this.state.board)
       }    
      //  console.log(boardItems)

      })
    }
  }

  buttonReset = () => {
    this.setState({
      board: ["", "", "",
              "", "", "",
              "", "", ""],
      playerTurn: "X",
      message: "It's X's turn!"
    })
   
  }

  checkForWinner = (board) => {
    const possibilities = [
                      [0, 1, 2],
                      [3, 4, 5],
                      [6, 7, 8],
                      [0, 3, 6],
                      [1, 4, 7],
                      [2, 5, 8],
                      [0, 4, 8],
                      [2, 4, 6]
                    ]
    console.log("From checkForWinner function")
    console.log(board);

    if(board[0] !== "" && board[0] === board[1] && board[0] === board[2]){
      console.log(board[0] + " is the winner!")
    } else if(board[3] !== "" && board[3] === board[4] && board[3] === board[5]){
      console.log(board[3] + " is the winner!")
    } else if(board[6] !== "" && board[6] === board[7] && board[6] === board[8]){
      console.log(board[6] + " is the winner!")
    } else if(board[0] !== "" && board[0] === board[3] && board[0] === board[6]){
      console.log(board[0] + " is the winner!")
    } else if(board[1] !== "" && board[1] === board[4] && board[1] === board[7]){
      console.log(board[1] + " is the winner!")
    } else if(board[2] !== "" && board[2] === board[5] && board[2] === board[8]){
      console.log(board[2] + " is the winner!")
    } else if(board[0] !== "" && board[0] === board[4] && board[0] === board[8]){
      console.log(board[0] + " is the winner!")
    } else if(board[2] !== "" && board[2] === board[4] && board[2] === board[6]){
      console.log(board[2] + " is the winner!")
    } else  {
      if([].concat(board).sort().reverse().pop() !== "") {
        console.log("It's a draw!!!!!!!!")
      }
    }
  }

  render() {

    let boardCells = this.state.board.map((cell, i) => {
      return <div key={i} className="cell" data-cell={i}>{this.state.board[i] !== "" ? (this.state.board[i] === "X" ? <Cross /> : <Circle /> ) : null}</div>
    })

    return (
      <div id="board-game">
        <h1>The ultimate Tic-tac-toe game!</h1>
        <h3>{this.state.message}</h3>
        <div className="board">
          {boardCells}
        </div>
        <Button buttonReset={this.buttonReset}>Reset</Button>
      </div>
    );
  }
}

export default App;

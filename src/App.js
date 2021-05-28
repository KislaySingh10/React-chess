import  Chess  from "chess.js";
import Chessboard from "chessboardjsx"
import React,{ useEffect, useRef, useState } from "react";

function App() {
  let game = useRef(null)
  const [fen, setFen] = useState("start")
  useEffect(() => {
    game.current = new Chess();
  }, [])
  const onDrop=({sourceSquare,targetSquare})=>{
    let move= game.current.move({
      from: sourceSquare,
      to: targetSquare
    }
    )
    if(move===null) return 
    else setFen(game.current.fen());
  }
  const newGame=()=>{
    game.current.clear();
    game.current.reset();
    setFen("start")
  }
  return (
    <>
    {
      game.current && game.current.in_checkmate() ?
      <div style={{textAlign:"center"}}><h1>Game Over,{game.current.turn()==="w"?"Black":"White"} Wins</h1>
      </div>
      :<span></span>
    }
    <div style={{textAlign:"center",marginTop:"2rem"}}>
      <button style={{}} onClick={newGame}>New Game</button>
    </div>
    <div className="app">
      <Chessboard 
      position={fen} 
      onDrop={onDrop}
      boardStyle={{
        borderRadius: "5px",
        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
      }}
      lightSquareStyle={{ backgroundColor: "#ADEFD1FF" }}
      darkSquareStyle={{ backgroundColor: "#00A4CCFF" }} >

      </Chessboard> 
    </div>
    <div style={{textAlign:"center"}}>
      {fen==="start" && <h5>Start with white</h5>}
    </div>
    </>
  );
}
export default App;

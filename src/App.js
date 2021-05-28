import  Chess  from "chess.js";
import Chessboard from "chessboardjsx"
import React,{ useEffect, useRef, useState } from "react";

function App() {
  const [styles,setStyles]= useState({})
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
  const highlightSquare=(square)=>{
    setStyles(prevValue => {return {...prevValue,[square]:{
      background: "radial-gradient(circle, #fffc00 36%, transparent 40%)"
    }}})
  }
  const mouseOver=(square)=>{
    let moves=game.current.moves({
      square: square,
      verbose: true
    })
    if(moves.length === 0 ){
      return;
    }
    highlightSquare(square);
    for (const x of moves)
      highlightSquare(x.to)
  }
  const mouseOut=()=>{
    setStyles({})
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
      id="board"
      position={fen} 
      onDrop={onDrop}
      boardStyle={{
        borderRadius: "5px",
        boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
      }}
      lightSquareStyle={{ backgroundColor: "#ADEFD1FF" }}
      darkSquareStyle={{ backgroundColor: "#00A4CCFF" }}
      onMouseOverSquare={mouseOver}
      onMouseOutSquare={mouseOut} 
      squareStyles={styles}>

      </Chessboard> 
    </div>
    <div style={{position:"absolute",left:"44%",top:"90%",textAlign:"center"}}>
      {fen==="start" && <h5>Start with white</h5>}
      <i >Developed By Kislay Singh</i>
    </div>
    </>
  );
}
export default App;

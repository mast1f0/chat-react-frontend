import React from "react";
import "./Board.style.css";

const AnimatedChessBoard: React.FC = () => {
  return (
    <div className="board-container">
      <div className="chess-board">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            className="cube"
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedChessBoard;

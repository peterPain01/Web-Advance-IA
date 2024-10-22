import { useState } from "react";

function Square({ value, onSquareClick, isWinningSquare }) {
    return (
        <button
            className={`square ${isWinningSquare ? "winning" : ""}`}
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    if (squares.every((square) => square !== null)) {
        status = "It's a draw!";
    }

    return (
        <>
            <div className="status">{status}</div>
            {Array.apply(null, Array(3)).map((_, i) => (
                <div className="board-row" key={i}>
                    {Array.apply(null, Array(3)).map((_, j) => (
                        <Square
                            key={j}
                            value={squares[i * 3 + j]}
                            onSquareClick={() => handleClick(i * 3 + j)}
                            isWinningSquare={
                                winner && winner.includes(i * 3 + j)
                            }
                        />
                    ))}
                </div>
            ))}
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    const [sortAsc, setSortAsc] = useState(true);

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            let appendRowColInfo = findMove(history[move - 1], squares);
            if (move == currentMove) {
                description =
                    "You are at move #" +
                    move +
                    " (" +
                    appendRowColInfo.row +
                    "," +
                    appendRowColInfo.col +
                    ")";
            } else
                description =
                    `${move}. ` +
                    "Go to move #" +
                    move +
                    " (" +
                    appendRowColInfo.row +
                    "," +
                    appendRowColInfo.col +
                    ")";
        } else {
            description = "Go to game start";
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    if (!sortAsc) {
        moves.reverse();
    }

    function handleSort() {
        setSortAsc(!sortAsc);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
                <button
                    className="btn-sort"
                    onClick={() => handleSort()}
                    style={{ backgroundColor: sortAsc ? "green" : "tomato" }}
                >
                    {sortAsc ? "ASC" : "DESC"}
                </button>
            </div>

            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return lines[i];
        }
    }
    return null;
}

function findMove(previousBoard, currentBoard) {
    for (let i = 0; i < 9; i++) {
        if (previousBoard[i] !== currentBoard[i]) {
            const row = Math.floor(i / 3);
            const col = i % 3;
            return { row, col };
        }
    }
    return null; // Trả về null nếu không có thay đổi
}

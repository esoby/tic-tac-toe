import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";
import styled from "@emotion/styled";
import Button from "../components/common/Button";
import PlayerInfo from "../components/Game/PlayerInfo";
import useTimer from "../\bhooks/useTimer";

const Game = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [board, setBoard] = useState(Array(state.size * state.size).fill(null));
  const [history, setHistory] = useState<number[]>([]);
  const [player1Undo, setPlayer1Undo] = useState(3);
  const [player2Undo, setPlayer2Undo] = useState(3);

  const [currentPlayer, setCurrentPlayer] = useState(() => {
    if (state.firstPlayer === "random") {
      const randomPlayer = Math.random() < 0.5 ? "player1" : "player2";
      return randomPlayer;
    } else {
      return state.firstPlayer;
    }
  });

  const [gameOver, setGameOver] = useState(false);

  // 타이머 종료 시 처리
  const onTimeExpired = () => {
    const emptyCells = board.flatMap((cell, index) => (cell === null ? index : []));
    if (emptyCells.length > 0) {
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      handleCellClick(randomIndex);
    }
  };

  const { timer, resetTimer } = useTimer(15, gameOver, onTimeExpired);

  // 게임 결과 확인
  useEffect(() => {
    const winnerMark = checkWinner();
    if (winnerMark) {
      if (winnerMark === state.player1Mark) {
        alert("player1 wins!");
        saveGameResult("player1");
      } else {
        alert("player2 wins!");
        saveGameResult("player2");
      }
      setGameOver(true);
    } else if (!board.includes(null)) {
      alert("Draw!");
      saveGameResult("Draw");
      setGameOver(true);
    }
  }, [board]);

  // 승리 조건 확인
  const checkWinner = () => {
    const size = state.size;
    const victoryValue = state.victoryValue;
    const symbols = [state.player1Mark, state.player2Mark];

    const checkLine = (line: string[]) => {
      for (const symbol of symbols) {
        let count = 0;
        for (let i = 0; i < line.length; i++) {
          if (line[i] === symbol) {
            count++;
            if (count === victoryValue) return symbol;
          } else {
            count = 0;
          }
        }
      }
      return null;
    };

    for (let i = 0; i < size; i++) {
      // 가로, 세로 검사
      const row = board.slice(i * size, i * size + size);
      const rowWinner = checkLine(row);
      if (rowWinner) return rowWinner;

      const column = Array.from({ length: size }, (_, k) => board[k * size + i]);
      const columnWinner = checkLine(column);
      if (columnWinner) return columnWinner;
    }

    // 대각선
    const diagonals: string[][] = [[], []];
    for (let i = 0; i < size; i++) {
      diagonals[0].push(board[i * size + i]);
      diagonals[1].push(board[i * size + (size - 1 - i)]);
    }
    for (const diagonal of diagonals) {
      const diagonalWinner = checkLine(diagonal);
      if (diagonalWinner) return diagonalWinner;
    }
    return null;
  };

  // 로컬스토리지에 게임 결과 저장
  const saveGameResult = (result: any) => {
    const gameResults = JSON.parse(localStorage.getItem("gameResults") as string) || [];

    gameResults.push({
      date: new Date().toISOString(),
      result: result,
      board: board,
      player1Mark: state.player1Mark,
      player1Color: state.player1Color,
      player2Mark: state.player2Mark,
      player2Color: state.player2Color,
      firstPlayer: state.firstPlayer === "random" ? "player1" : state.firstPlayer,
      history: history,
    });

    localStorage.setItem("gameResults", JSON.stringify(gameResults));
  };

  // 게임보드 클릭 이벤트 핸들러
  const handleCellClick = (index: any) => {
    if (board[index] || gameOver) return;

    setHistory((prev) => {
      const newArray = [...prev, index];
      return newArray;
    });

    const newBoard = [...board];
    newBoard[index] = currentPlayer === "player1" ? state.player1Mark : state.player2Mark;
    setBoard(newBoard);

    setCurrentPlayer(currentPlayer === "player1" ? "player2" : "player1");
    resetTimer();
  };

  // 무르기 버튼 클릭
  const handleUndoClick = (player: string) => {
    if (history.length === 0) return;

    if (player === "player1" && player1Undo === 0) return;
    if (player === "player2" && player2Undo === 0) return;

    const newHistory = history.slice(0, history.length - 1);
    setHistory(newHistory);

    const newBoard = [...board];
    const lastIndex = history[history.length - 1];
    newBoard[lastIndex] = null;
    setBoard(newBoard);

    setCurrentPlayer(currentPlayer === "player1" ? "player2" : "player1");

    if (player === "player1") {
      setPlayer1Undo((prev) => prev - 1);
    } else if (player === "player2") {
      setPlayer2Undo((prev) => prev - 1);
    }

    resetTimer();
  };

  return (
    <GameContainer>
      <PageTitle>GAME</PageTitle>
      <PlayerInfoBlock>
        <PlayerInfo
          player="player1"
          currentPlayer={currentPlayer}
          playerColor={state.player1Color}
          playerMark={state.player1Mark}
          playerUndo={player1Undo}
          handleUndoClick={handleUndoClick}
        />
        <PlayerInfo
          player="player2"
          currentPlayer={currentPlayer}
          playerColor={state.player2Color}
          playerMark={state.player2Mark}
          playerUndo={player2Undo}
          handleUndoClick={handleUndoClick}
        />
      </PlayerInfoBlock>
      <div>
        <TimerText>시간 제한 : {timer} seconds</TimerText>
      </div>
      <GameBoard gameSize={state.size}>
        {board.map((cell, index) => (
          <Cell
            key={index}
            onClick={() => handleCellClick(index)}
            playerColor={cell === state.player1Mark ? state.player1Color : state.player2Color}
          >
            {cell}
          </Cell>
        ))}
      </GameBoard>
      <ButtonBlock>
        <Button size="medium" onClick={() => navigate("/")}>
          홈으로 돌아가기
        </Button>
        <Button size="medium" onClick={() => navigate("/history")}>
          기록 보기
        </Button>
      </ButtonBlock>
    </GameContainer>
  );
};

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const PlayerInfoBlock = styled.div`
  display: flex;
  gap: 30px;
`;

const TimerText = styled.div`
  text-decoration: underline;
  color: gray;
`;

const Cell = styled.div<{ playerColor: string }>`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  cursor: pointer;
  font-size: 24px;
  color: ${(props) => props.playerColor || "black"};
`;

const GameBoard = styled.div<{
  gameSize: number;
}>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.gameSize}, 100px)`};
`;

const ButtonBlock = styled.div`
  display: flex;
  gap: 5px;
`;
export default Game;

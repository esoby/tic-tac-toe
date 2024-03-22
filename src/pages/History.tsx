import { useEffect, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import styled from "@emotion/styled";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

type gameResultType = {
  date: string;
  result: string;
  board: any[];
  player1Mark: string;
  player1Color: string;
  player2Mark: string;
  player2Color: string;
  firstPlayer: string;
  history: number[];
};

const History = () => {
  const navigate = useNavigate();
  const [gameResults, setGameResults] = useState<gameResultType[]>([]);

  useEffect(() => {
    const storedGameResults = localStorage.getItem("gameResults");
    if (storedGameResults) setGameResults(JSON.parse(storedGameResults));
  }, []);

  return (
    <HistoryContainer>
      <PageTitle>Game History</PageTitle>
      {gameResults.length > 0 ? (
        <ul>
          {gameResults.map((result, index) => (
            <StyledLi key={index}>
              <p>게임 결과 : {result.result}!</p>
              <SmallText>{result.date.toString().split("T")[0]}</SmallText>
              <GameBoard gameSize={Math.sqrt(result.board?.length || 0)}>
                {result.board &&
                  result.board.map((cellMark, cellIndex) => {
                    const playerIndex = result.history.indexOf(cellIndex);
                    const isPlayer1 = playerIndex % 2 === 0;
                    const playerColor = isPlayer1 ? result.player1Color : result.player2Color;
                    return (
                      <Cell key={cellIndex} playerColor={playerColor}>
                        {cellMark}
                      </Cell>
                    );
                  })}
              </GameBoard>
            </StyledLi>
          ))}
        </ul>
      ) : (
        <p>게임 기록이 없습니다.</p>
      )}

      <Button size="medium" onClick={() => navigate("/")}>
        홈으로 돌아가기
      </Button>
    </HistoryContainer>
  );
};

const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid black;
  border-color: #e3e3e3;
  border-radius: 12px;
  padding: 15px;
`;

const SmallText = styled.p`
  font-size: small;
  color: #5b5b5b;
`;

interface CellProps {
  playerColor: string;
}

const Cell = styled.div<CellProps>`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  font-size: 24px;
  color: ${(props) => props.playerColor || "black"};
`;

interface BoardProps {
  gameSize: number;
}

const GameBoard = styled.div<BoardProps>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.gameSize}, 100px)`};
`;

export default History;

import styled from "@emotion/styled";
import Button from "../common/Button";

interface PlayerInfoProps {
  player: string;
  currentPlayer: string;
  playerColor: string;
  playerMark: string;
  playerUndo: number;
  handleUndoClick: (player: string) => void;
}

const PlayerInfo = ({
  player,
  currentPlayer,
  playerColor,
  playerMark,
  playerUndo,
  handleUndoClick,
}: PlayerInfoProps) => {
  return (
    <div>
      <StyledP flag={currentPlayer === player} playerColor={playerColor}>
        {player} ({playerMark})
      </StyledP>
      <SmallText>남은 무르기 횟수 : {playerUndo}</SmallText>
      <Button
        onClick={() => handleUndoClick(player)}
        size="small"
        disabled={currentPlayer === player}
      >
        무르기
      </Button>
    </div>
  );
};

const StyledP = styled.p<{ flag: boolean; playerColor: string }>`
  padding: 8px;
  border-radius: 5px;
  color: ${(props) => props.playerColor || "black"};
  background-color: ${(props) => (props.flag ? "#e7e7e7" : "white")};
`;

const SmallText = styled.p`
  font-size: small;
  color: gray;
`;

export default PlayerInfo;

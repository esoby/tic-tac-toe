import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Select from "../common/Select";

const SetupForm = () => {
  const navigate = useNavigate();
  const [size, setSize] = useState<number>(3);
  const [victoryValue, setVictoryValue] = useState<number>(3);
  const [player1Mark, setPlayer1Mark] = useState<string>("X");
  const [player1Color, setPlayer1Color] = useState<string>("blue");
  const [player2Mark, setPlayer2Mark] = useState<string>("O");
  const [player2Color, setPlayer2Color] = useState<string>("red");
  const [firstPlayer, setFirstPlayer] = useState<string>("random");
  const [errMsg, setErrMsg] = useState("");

  const colorList = ["red", "orange", "yellow", "green", "blue", "navy", "purple"];

  const gameSizeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (val >= Number.MAX_SAFE_INTEGER || val < 3) {
      setErrMsg("게임판의 크기는 최소 3x3입니다.");
      return;
    }
    setErrMsg("");
    setSize(val);
  };

  const victoryValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (val < 3) {
      setErrMsg("최소 승리 조건은 3입니다.");
      return;
    }
    if (val > size) {
      setErrMsg("최대 승리 조건은 게임판의 크기입니다.");
      return;
    }
    setErrMsg("");
    setVictoryValue(val);
  };

  const gameStartHandler = (): void => {
    navigate("/game", {
      state: {
        size,
        victoryValue,
        player1Mark,
        player1Color,
        player2Mark,
        player2Color,
        firstPlayer,
      },
    });
  };

  return (
    <FormBlock>
      <RowBlock>
        <Input
          id="size"
          type="number"
          value={size}
          labelText="게임판의 크기"
          placeholder="게임판의 크기"
          onChange={(e) => gameSizeHandler(e)}
        />
        <Input
          id="victoryValue"
          type="number"
          value={victoryValue}
          labelText="승리 조건"
          placeholder="승리 조건"
          onChange={(e) => victoryValueHandler(e)}
        />
      </RowBlock>
      <RowBlock>
        <Input
          id="player1Mark"
          type="text"
          value={player1Mark}
          labelText="플레이어 1 마크"
          placeholder="플레이어 1 마크"
          onChange={(e) => setPlayer1Mark(e.target.value.slice(0, 1))}
        />
        <Select
          id="player1Color"
          labelText="플레이어 1 색상"
          value={player1Color}
          onChange={(e) => setPlayer1Color(e.target.value)}
          optionList={colorList}
          optionTextList={colorList}
        />
      </RowBlock>

      <RowBlock>
        <Input
          id="player2Mark"
          type="text"
          value={player2Mark}
          labelText="플레이어 2 마크"
          placeholder="플레이어 2 마크"
          onChange={(e) => setPlayer2Mark(e.target.value.slice(0, 1))}
        />
        <Select
          id="player2Color"
          labelText="플레이어 2 색상"
          value={player2Color}
          onChange={(e) => setPlayer2Color(e.target.value)}
          optionList={colorList}
          optionTextList={colorList}
        />
      </RowBlock>

      <Select
        id="firstPlayer"
        labelText="먼저 시작하는 플레이어"
        onChange={(e) => setFirstPlayer(e.target.value)}
        value={firstPlayer}
        optionList={["random", "player1", "player2"]}
        optionTextList={["랜덤", "플레이어1", "플레이어2"]}
      />

      <ErrorText>{errMsg}</ErrorText>
      <Button size="large" onClick={gameStartHandler}>
        게임 시작
      </Button>
    </FormBlock>
  );
};

const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const RowBlock = styled.div`
  display: flex;
  gap: 10px;
`;

const ErrorText = styled.p`
  font-size: 0.8rem;
  color: red;
`;

export default SetupForm;

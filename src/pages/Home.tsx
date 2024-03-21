import styled from "@emotion/styled";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/common/PageTitle";

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <PageTitle>TIC TAC TOE!</PageTitle>
      <Button size="large" onClick={() => navigate("/setting")}>
        게임 시작
      </Button>
      <Button size="large" onClick={() => navigate("/history")}>
        기록된 게임 보기
      </Button>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default Home;

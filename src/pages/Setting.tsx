import styled from "@emotion/styled";
import PageTitle from "../components/common/PageTitle";
import SetupForm from "../components/Setting/SetupForm";

const Setting = () => {
  return (
    <SettingContainer>
      <PageTitle>- Game Setup -</PageTitle>
      <SetupForm />
    </SettingContainer>
  );
};

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default Setting;

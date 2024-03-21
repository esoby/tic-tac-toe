import styled from "@emotion/styled";

interface PageTitleProps {
  children: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return <PageTitleH1>{children}</PageTitleH1>;
};

const PageTitleH1 = styled.h1`
  display: block;
  font-size: x-large;
  font-weight: 300;
`;

export default PageTitle;

import styled from 'styled-components';

interface H3Props {
  children: React.ReactNode;
}

const H3: React.FC<H3Props> = ({ children }) => {
  return <H3Base>{children}</H3Base>;
};

export default H3;

const H3Base = styled.h3`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
`;

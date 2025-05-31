import styled from 'styled-components';
import PlanComponent from './PlanComponent';

const HomeComponent = () => {
  return (
    <HomeBase>
      <PlanComponent />
    </HomeBase>
  );
};

export default HomeComponent;

const HomeBase = styled.main`
  background-color: ${props => props.theme.primary_08};
  height: calc(var(--vh, 1vh) * 100 - 60px);
  padding: 24px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

import styled from 'styled-components';
// icons
import { FaFileAlt } from 'react-icons/fa';
import ApplyBtn from '../Common/Button/ApplyButton';
import StepTitle from '../Common/Title/StepTitle';

const CreatePlanComponent = () => {
  return (
    <CreateBase>
      <StepTitle>플랜 만들기</StepTitle>
      {/* input */}
      <PlanInputBox>
        <InputIcon />
        <PlanInput placeholder="플랜 이름" />
      </PlanInputBox>
      {/* select-category */}
      <SelectCategory>
        <Category>
          <CategoryName>기초</CategoryName>
          <CategorySpan>800 단어</CategorySpan>
        </Category>
        <Category>
          <CategoryName>700점</CategoryName>
          <CategorySpan>1200 단어</CategorySpan>
        </Category>
        <Category>
          <CategoryName>800점</CategoryName>
          <CategorySpan>1400 단어</CategorySpan>
        </Category>
        <Category>
          <CategoryName>900점</CategoryName>
          <CategorySpan>1100 단어</CategorySpan>
        </Category>
      </SelectCategory>
      {/* button */}
      <ApplyBtn>다음</ApplyBtn>
    </CreateBase>
  );
};

export default CreatePlanComponent;

const CreateBase = styled.section`
  width: 100%;
  padding: 24px;
`;

const PlanInputBox = styled.div`
  background-color: ${props => props.theme.primary_08};
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 12px;
  padding: 0 16px;
`;

const InputIcon = styled(FaFileAlt)`
  font-size: 16px;
  color: ${props => props.theme.primary_06};
`;

const PlanInput = styled.input`
  background-color: transparent;
  margin-left: 12px;
  &::placeholder {
    color: ${props => props.theme.primary_06};
    font-size: 16px;
  }
`;

const SelectCategory = styled.ul`
  width: 100%;
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 0;

  /* 기본: 1개 */
  grid-template-columns: 1fr;

  @media (min-width: 255px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 720px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const Category = styled.li`
  background-color: ${props => props.theme.primary_08};
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  border-radius: 12px;
  cursor: pointer;
`;

const CategoryName = styled.h4`
  font-size: 18px;
  font-weight: 600;
`;

const CategorySpan = styled.span`
  color: ${props => props.theme.primary_04};
`;

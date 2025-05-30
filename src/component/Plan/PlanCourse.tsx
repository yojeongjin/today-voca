import styled from 'styled-components';
// components
import ApplyBtn from '../Common/Button/ApplyButton';
// ifs
import { NextStepProps } from '@/Interface/Istep';

const PlanCourse = ({ onNext }: NextStepProps) => {
  return (
    <TypeBase>
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
      <ApplyBtn onClick={onNext}>다음</ApplyBtn>
    </TypeBase>
  );
};

export default PlanCourse;

const TypeBase = styled.section`
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 75px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 24px;
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

  // border: 1px solid #027fff;
  // background-color: rgb(244, 249, 253);
`;

const CategoryName = styled.h4`
  font-size: 18px;
  font-weight: 600;
  // color: #737373;
`;

const CategorySpan = styled.span`
  color: ${props => props.theme.primary_04};
`;

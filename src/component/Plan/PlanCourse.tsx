import styled from 'styled-components';
// components
import ApplyBtn from '../Common/Button/ApplyButton';
// ifs
import { PlanProps } from '@/Interface/IPlan';

const PlanCourse = ({ planInfo, setPlanInfo, onNext }: PlanProps) => {
  const courseList = [
    {
      name: '기초',
      length: 772,
      level: 'basic',
    },
    {
      name: '중등',
      length: 600,
      level: '700',
    },
    {
      name: '고교/수능',
      length: 840,
      level: '800',
    },
    {
      name: 'toeic 850+',
      length: 900,
      level: '900',
    },
  ];
  return (
    <TypeBase>
      <SelectCategory>
        {courseList.map(course => (
          <Category
            key={course.name}
            isSelect={planInfo.course === course.name}
            onClick={() => {
              setPlanInfo({
                ...planInfo,
                level: course.level,
                length: course.length,
                course: course.name,
              });
            }}
          >
            <CategoryName>{course.name}</CategoryName>
            <CategorySpan>{course.length} 단어</CategorySpan>
          </Category>
        ))}
      </SelectCategory>

      {/* button */}
      <ApplyBtn disabled={planInfo.course === ''} onClick={onNext}>
        다음
      </ApplyBtn>
    </TypeBase>
  );
};

export default PlanCourse;

const TypeBase = styled.section`
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 36px 24px 24px;
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

const Category = styled.li<{ isSelect: boolean }>`
  background-color: ${props => (props.isSelect ? '#f4f9fd' : '#f8F9FA')};
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  border: ${props => (props.isSelect ? '1px solid #027fff' : 'none')};
  border-radius: 12px;
  color: ${props => (props.isSelect ? ' #1871ff' : '#212529')};
  cursor: pointer;
`;

const CategoryName = styled.h4`
  font-size: 18px;
  font-weight: 600;
`;

const CategorySpan = styled.span`
  color: ${props => props.theme.primary_05};
`;

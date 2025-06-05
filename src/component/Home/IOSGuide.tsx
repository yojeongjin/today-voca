import styled from 'styled-components';

import BottomSheet from '../Common/BottomSheet/BottomSheet';
import ApplyBtn from '../Common/Button/ApplyButton';

interface iOSProps {
  onClick: () => void;
}

const IOSGuide = ({ onClick }: iOSProps) => {
  return (
    <BottomSheet height={480} isOpen={true}>
      <A2HSBase>
        <CompleteH2>홈 화면 추가</CompleteH2>
        <CompleteBody>
          <CompleteH4>홈 화면에 콩글리시를 심어보세요!</CompleteH4>
          <CompleteP>
            현재 사용 중인 브라우저에서는 앱 설치가 지원되지 않아요.
            <br></br>아래 순서를 따라 홈 화면에 추가해주세요!
          </CompleteP>
        </CompleteBody>
        <GuideMenu>
          <GuideItem>
            <Guide>1. Safari 공유 버튼 클릭 </Guide>
            <GuideImg src="/images/1.png" alt="iOS 홈 화면 추가 방법" />
          </GuideItem>
          <GuideItem>
            <Guide>2. 홈 화면에 추가 </Guide>
            <GuideImg src="/images/2.png" alt="iOS 홈 화면 추가 방법" />
          </GuideItem>
        </GuideMenu>
        <ApplyBtn onClick={onClick}>닫기</ApplyBtn>
      </A2HSBase>
    </BottomSheet>
  );
};

export default IOSGuide;

const A2HSBase = styled.div`
  position: relative;
  padding: 24px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CompleteH2 = styled.h2`
  font-weight: 500;
  font-size: 16px;
`;

const CompleteBody = styled.div`
  position: relative;
  width: 100%;
`;

const CompleteH4 = styled.h4`
  font-size: 20px;
  font-weight: 300;
`;

const CompleteP = styled.p`
  color: ${props => props.theme.primary_05};
  font-size: 13px;
  margin-top: 8px;
`;

const GuideMenu = styled.ul``;

const GuideItem = styled.li`
  padding: 8px 0;
`;

const GuideImg = styled.img`
  width: 70%;
  display: block;
  border-radius: 5px;
  margin: 0 auto;
`;

const Guide = styled.p`
  color: ${props => props.theme.primary_01};
`;

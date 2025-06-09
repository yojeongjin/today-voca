import Image from 'next/image';
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
            <Guide>
              <GuideStrong>Step1</GuideStrong>
              Safari 공유 버튼 클릭{' '}
            </Guide>
            <GuideImgBox>
              <Image
                src="/images/1.png"
                alt="iOS 홈 화면 추가 방법1"
                fill
                style={{ objectFit: 'contain' }}
              />
            </GuideImgBox>
          </GuideItem>
          <GuideItem>
            <Guide>
              <GuideStrong>Step2</GuideStrong>홈 화면에 추가{' '}
            </Guide>
            <GuideImgBox>
              <Image
                src="/images/2.png"
                alt="iOS 홈 화면 추가 방법2"
                fill
                style={{ objectFit: 'contain' }}
              />
            </GuideImgBox>
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

const GuideMenu = styled.ul`
  background-color: #fafafa;
  border-radius: 4px;
  padding: 16px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 6px 16px;
`;

const GuideItem = styled.li``;

const GuideImgBox = styled.div`
  position: relative;
  // width: 70%;
  height: 90px;
  margin: 16px auto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Guide = styled.div`
  text-align: left;
  font-weight: 500;
  font-size: 16px;
`;

const GuideStrong = styled.strong`
  background-color: #f3f9ff;
  padding: 8px 12px;
  border-radius: 20px;
  margin-right: 8px;
  color: #1871ff;
  font-size: 14px;
`;

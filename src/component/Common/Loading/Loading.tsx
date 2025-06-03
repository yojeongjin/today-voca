import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <LoadingBase>
      <LoadingInner>
        <LoadingAnimation>
          <LoadingBox>
            <LoadingImg>
              <Img src="/gif/upset.gif" alt="loading" />
            </LoadingImg>
            <LoadingImg>
              <Img src="/gif/neutral.gif" alt="loading" />
            </LoadingImg>
            <LoadingImg>
              <Img src="/gif/happy.gif" alt="loading" />
            </LoadingImg>
            <LoadingImg>
              <Img src="/gif/delight.gif" alt="loading" />
            </LoadingImg>
          </LoadingBox>
        </LoadingAnimation>
      </LoadingInner>
    </LoadingBase>
  );
};

export default Loading;

const LoadingBase = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

const LoadingInner = styled.div`
  width: 100%;
  max-width: 720px;
  height: calc(var(--vh, 1vh) * 100);
  line-height: 1.8;
`;

// 로딩 애니메이션

const LoadingAnimation = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingBox = styled.div`
  display: flex;
  align-items: center;
`;

const LoadingImg = styled.div`
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  margin-right: -6px;
  // overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${props => props.theme.primary_07};
    width: 100%;
    height: 50%;
    border-radius: 50%;
    z-index: -1;
    margin-right: -6px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

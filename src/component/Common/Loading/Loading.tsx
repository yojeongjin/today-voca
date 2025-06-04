import React from 'react';
import styled, { keyframes } from 'styled-components';
// animation
import Angry from '../Lottie/Angry';
import Neutral from '../Lottie/Neutral';
import Happy from '../Lottie/Happy';
import Delighted from '../Lottie/Delighted';

const Loading = () => {
  return (
    <LoadingBase>
      <LoadingInner>
        <LoadingAnimation>
          <LoadingBox>
            <LoadingImg>
              <Angry />
            </LoadingImg>
            <LoadingImg>
              <Neutral />
            </LoadingImg>
            <LoadingImg>
              <Happy />
            </LoadingImg>
            <LoadingImg>
              <Delighted />
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

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

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
  animation: ${bounce} 1.2s ease-in-out infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
  &:nth-child(4) {
    animation-delay: 0.6s;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${props => props.theme.primary_08};
    width: 100%;
    height: 50%;
    border-radius: 50%;
    z-index: -1;
  }
`;

import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { signin } from '@/redux/modules/auth';
// utils
import { validateField } from '@/utils/validation';
import { handleApiError } from '@/utils/handleApiError';
// hooks
import { useModal } from '@/hooks/useModal';
import { useLoading } from '@/hooks/useLoading';
import { useBottom } from '@/hooks/useBottom';
// components
import JoinComponent from '@/component/Auth/Join/JoinComponent';
import JoinGuide from '@/component/Auth/Join/JoinGuide';
import JoinAuth from '@/component/Auth/Join/JoinAuth';
import ApplyBtn from '@/component/Common/Button/ApplyButton';
import Modal from '@/component/Common/Modal/Modal';
import BottomSheet from '@/component/Common/BottomSheet/BottomSheet';
import JoinComplete from '@/component/Auth/Join/JoinComplete';

const JoinContainer = () => {
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(180);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { isLoading, setIsLoading } = useLoading();
  const { openBottom, setOpenBottom } = useBottom();
  const { isOpen, openModal, closeModal, modalRef } = useModal();
  // 이용약관 필수동의 state
  const [agreements, setAgreements] = useState({
    guidanceAgreed: false,
    personalInfoAgreed: false,
  });
  // 가입정보 state
  const [joinInfo, setJoinInfo] = useState({
    email: '',
    pwd: '',
    rePwd: '',
    name: '',
  });
  // 유효성 체크 state
  const [valid, setValid] = useState({
    email: false,
    pwd: false,
    rePwd: false,
    name: false,
  });
  // auth check
  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState('');

  // join input form onchange
  useEffect(() => {
    setValid(prev => ({
      ...prev,
      rePwd: joinInfo.rePwd === joinInfo.pwd,
    }));
  }, [joinInfo.rePwd, joinInfo.pwd]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startCountdown = () => {
    // 리셋
    setCountdown(180);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // 초마다 1초씩 감소
    intervalRef.current = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    // 3분 뒤 홈 리다이렉트
    timeoutRef.current = setTimeout(() => {
      clearInterval(intervalRef.current!);
      closeModal();
      alert('인증 시간이 만료되었습니다.');
    }, 180000);
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setJoinInfo(prev => ({ ...prev, [name]: value }));

      // rePwd 제외한 일반 필드 유효성만 검증
      if (name !== 'rePwd') {
        setValid(prev => ({
          ...prev,
          [name]: validateField(name, value),
        }));
      }
    },
    [joinInfo],
  );

  const handleAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/join`, {
        params: {
          email: joinInfo.email,
        },
      });

      if (res.data.code === 200) {
        openModal();

        startCountdown();
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  }, [joinInfo.email]);

  const reAuth = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/join`, {
        params: {
          email: joinInfo.email,
        },
      });
      if (res.data.code === 200) {
        alert('인증번호가 재전송되었습니다.');
        startCountdown();
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleJoin = async () => {
    const body = {
      name: joinInfo.name,
      pwd: joinInfo.pwd,
      email: joinInfo.email,
    };
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/join`, body);
      setOpenBottom(true);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleSignin = () => {
    const body = {
      email: joinInfo.email,
      pwd: joinInfo.pwd,
    };
    dispatch(signin(body));
  };

  const handleVerify = async () => {
    try {
      const body = {
        email: joinInfo.email,
        authCode: code,
      };
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/join/verify`, body);

      if (res.data.success) {
        setIsVerified(true);
        closeModal();

        // 타이머 정리
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <>
      <JoinBase>
        <JoinComponent
          isVerified={isVerified}
          valid={valid}
          isLoading={isLoading}
          joinInfo={joinInfo}
          handleChange={handleChange}
          handleAuth={handleAuth}
        />
        <JoinGuide agreements={agreements} setAgreements={setAgreements} />
        <ApplyBtn
          disabled={Object.values(joinInfo).includes('') || !agreements.guidanceAgreed}
          onClick={handleJoin}
        >
          가입하기
        </ApplyBtn>
        {isOpen && (
          <Modal
            heading="인증번호 입력"
            modalRef={modalRef}
            onClose={() => {
              closeModal();
            }}
            onApply={handleVerify}
          >
            <JoinAuth reAuth={reAuth} setCode={setCode} countdown={countdown} />
          </Modal>
        )}
      </JoinBase>
      {openBottom && (
        <BottomSheet height={580} isOpen={openBottom}>
          <JoinComplete handleComplete={handleSignin} setOpenBottom={setOpenBottom} />
        </BottomSheet>
      )}
    </>
  );
};

export default JoinContainer;

const JoinBase = styled.main`
  position: relative;
  width: 100%;
  max-width: 450px;
  min-width: 280px;
  display: flex;
  justify-content: center;
  flex-flow: column;
  gap: 20px;
  margin: 0 auto;
  padding: 24px 16px;
`;

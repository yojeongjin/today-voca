import { useState } from 'react';
import styled from 'styled-components';
import Modal from '@/component/Common/Modal/Modal';

type AgreementState = {
  guidanceAgreed: boolean;
  personalInfoAgreed: boolean;
};
interface JoinGuideProps {
  agreements: AgreementState;
  setAgreements: React.Dispatch<React.SetStateAction<AgreementState>>;
}

const JoinGuide = ({ agreements, setAgreements }: JoinGuideProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [heading, setHeading] = useState('');
  const isAllAgreed = Object.values(agreements).every(Boolean);

  // 이용약관 동의
  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    const updated = { ...agreements, [name]: checked };
    setAgreements(updated);
  };

  // 이용약관 전체동의
  const handleAllAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setAgreements({
      guidanceAgreed: checked,
      personalInfoAgreed: checked,
    });
  };

  return (
    <AgreeContainer>
      {/* 전체 동의 */}
      <TotalAgree>
        <AgreeCheckInput
          type="checkbox"
          id="agree_check_all"
          name="agree_check_all"
          checked={isAllAgreed}
          onChange={handleAllAgreementChange}
        />
        <TotalLabel htmlFor="agree_check_all">이용약관 전체동의</TotalLabel>
      </TotalAgree>
      {/* 선택 동의 */}
      <AgreeMenu>
        <AgreeItem>
          <AgreeCheckInput
            type="checkbox"
            id="agree_check_used"
            name="guidanceAgreed"
            checked={agreements.guidanceAgreed}
            onChange={handleAgreementChange}
          />
          <AgreeLabel htmlFor="agree_check_used">[필수] 이용약관 동의</AgreeLabel>
          <AgreeDetail
            onClick={() => {
              setHeading('이용약관');
              setOpenModal(true);
            }}
          >
            자세히
          </AgreeDetail>
        </AgreeItem>
        <AgreeItem>
          <AgreeCheckInput
            type="checkbox"
            id="agree_check_info"
            name="personalInfoAgreed"
            checked={agreements.personalInfoAgreed}
            onChange={handleAgreementChange}
          />
          <AgreeLabel htmlFor="agree_check_info">[선택] 개인정보 제3자 제공</AgreeLabel>
          <AgreeDetail
            onClick={() => {
              setHeading('개인정보 제공 동의');
              setOpenModal(true);
            }}
          >
            자세히
          </AgreeDetail>
        </AgreeItem>
      </AgreeMenu>
      {openModal && (
        <Modal
          heading={heading}
          onClose={() => {
            setOpenModal(false);
          }}
          onApply={() => {
            setOpenModal(false);
          }}
        >
          <ModalBody>
            <Content>
              Lorem ipsum dolor sit amet, flibber wobble zonktastic. By accessing this service, you
              agree to the following nonsense:
            </Content>
            <ContentMenu>
              <ContentItem>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </ContentItem>
              <ContentItem>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </ContentItem>
              <ContentItem>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </ContentItem>
              <ContentItem>
                Blorbulus maximus est terminus glorb, et snorptum flibber wobble in perpetuum zoink.
              </ContentItem>
            </ContentMenu>
          </ModalBody>
        </Modal>
      )}
    </AgreeContainer>
  );
};

export default JoinGuide;

// 이용약관 동의
const AgreeContainer = styled.div``;

const AgreeMenu = styled.ul`
  margin-top: 16px;
`;

const AgreeItem = styled.li`
  position: relative;
  display: flex;
  padding: 8px 0;
  &:first-child {
    padding: 0 0;
  }
`;

const AgreeCheckInput = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${props => props.theme.primary_07};
  border-radius: 1px;
  margin-right: 10px;
  cursor: pointer;

  &:checked {
    background-color: ${props => props.theme.primary_03};
    border-color: transparent;
    background-image: url('/svg/check.svg');
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
  }
`;

const AgreeDetail = styled.span`
  position: absolute;
  right: 12px;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
`;

const TotalAgree = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #ebebeb;
`;

const TotalLabel = styled.label`
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
`;

const AgreeLabel = styled.label`
  font-weight: 300;
  cursor: pointer;
`;

// modal

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: scroll;
`;

const Content = styled.p``;

const ContentMenu = styled.ul`
  color: ${props => props.theme.primary_04};
`;

const ContentItem = styled.li`
  position: relative;
  counter-increment: circle-counter;
  padding-left: 25px;
  margin-bottom: 7px;
  line-height: 1.5;
  letter-spacing: -0.3px;
  &:after {
    content: '';
    background: ${props => props.theme.primary_04};
    position: absolute;
    top: 4px;
    left: 0px;
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    z-index: 1;
  }
  &:before {
    content: counter(circle-counter);
    position: absolute;
    top: 4px;
    left: 5px;
    font-size: 10px;
    font-weight: 500;
    color: #fff;
    z-index: 2;
  }
`;

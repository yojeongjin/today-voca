import { useRouter } from 'next/router';
import styled from 'styled-components';

// hooks
import { useUser } from '@/hooks/useUser';
import { useBottom } from '@/hooks/useBottom';
// util
import axios from '@/utils/axiosInstance';
// icons
import { RxDotsHorizontal } from 'react-icons/rx';
import { FcSurvey } from 'react-icons/fc';
import { FcExport } from 'react-icons/fc';

import BottomSheet from '../Common/BottomSheet/BottomSheet';

const HomeTitle = () => {
  const user = useUser();
  const router = useRouter();
  const { openBottom, setOpenBottom } = useBottom();

  const handleLogout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/auth/logout`);

    router.push('/');
  };
  return (
    <>
      <HeaderTitle>
        <UserNameH4>
          <NameStrong>{user}</NameStrong>
          님의 플랜
        </UserNameH4>
        <DotButton
          onClick={() => {
            setOpenBottom(true);
          }}
        >
          <RxDotsHorizontal />
        </DotButton>
      </HeaderTitle>
      {openBottom && (
        <BottomSheet
          height={480}
          isOpen={openBottom}
          onClose={() => {
            setOpenBottom(false);
          }}
        >
          <BottomBase>
            <BottomH4>더보기</BottomH4>

            <BottomMenu>
              <BottomItem
                onClick={() => {
                  setOpenBottom(false);
                  router.push('/mypage');
                }}
              >
                <BottomIcon>
                  <FcSurvey />
                </BottomIcon>
                내 플랜 관리
              </BottomItem>
              <BottomItem onClick={handleLogout}>
                <BottomIcon>
                  <FcExport />
                </BottomIcon>
                로그아웃
              </BottomItem>
            </BottomMenu>
          </BottomBase>
        </BottomSheet>
      )}
    </>
  );
};

export default HomeTitle;

const HeaderTitle = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 16px;
  color: ${props => props.theme.primary_04};
`;

const UserNameH4 = styled.h4`
  font-size: 17px;
  font-weight: 300;
`;

const NameStrong = styled.strong`
  font-weight: 500;
`;

const DotButton = styled.button`
  font-size: 20px;
  color: ${props => props.theme.primary_05};
`;

// bottom
const BottomBase = styled.div`
  min-height: 260px;
  padding-top: 16px;
  font-size: 16px;
`;

const BottomH4 = styled.h4`
  font-weight: 500;
  text-align: center;
`;

const BottomMenu = styled.ul`
  margin-top: 28px;
`;

const BottomItem = styled.li`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.03);
  cursor: pointer;
  &:first-child {
    border-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
`;

const BottomIcon = styled.i`
  margin: 4px 16px 0 0;
  font-size: 20px;
`;

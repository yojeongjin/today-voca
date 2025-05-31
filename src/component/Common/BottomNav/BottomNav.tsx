import { useRouter } from 'next/router';
import styled from 'styled-components';

// icons
import { PiHouseLineFill, PiNotebookFill, PiDotsThreeOutlineFill } from 'react-icons/pi';

const BottomNav = () => {
  const router = useRouter();
  return (
    <BottomNavBase>
      <BottomMenu>
        <BottomItem
          isLocation={router.pathname === '/'}
          onClick={() => {
            router.push('/');
          }}
        >
          <HomeIcon />홈
        </BottomItem>
        <BottomItem
          isLocation={router.pathname === '/notebook'}
          onClick={() => {
            router.push('/notebook');
          }}
        >
          <NoteIcon />
          단어장
        </BottomItem>
        <BottomItem isLocation={router.pathname === '/mypage'}>
          <MoreIcon />더 보기
        </BottomItem>
      </BottomMenu>
    </BottomNavBase>
  );
};

export default BottomNav;

const BottomNavBase = styled.div`
  height: 60px;
`;

const BottomMenu = styled.ul`
  display: flex;
  height: 100%;
`;

const BottomItem = styled.li<{ isLocation: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  color: ${props => (props.isLocation ? '#212529' : '#cfd4da')};
  font-size: 11px;
  cursor: pointer;
`;

const HomeIcon = styled(PiHouseLineFill)`
  font-size: 24px;
`;

const NoteIcon = styled(PiNotebookFill)`
  font-size: 24px;
`;

const MoreIcon = styled(PiDotsThreeOutlineFill)`
  font-size: 24px;
`;

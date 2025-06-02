import styled from 'styled-components';
// icon
import { VscListSelection } from 'react-icons/vsc';

interface HamburgerProps {
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
const Hamburger: React.FC<HamburgerProps> = ({ setOpenSidebar }) => {
  return (
    <HamburgerBase
      onClick={() => {
        setOpenSidebar(true);
      }}
    >
      <VscListSelection />
    </HamburgerBase>
  );
};
export default Hamburger;

const HamburgerBase = styled.button`
  color: ${props => props.theme.primary_03};
  font-size: 26px;
`;

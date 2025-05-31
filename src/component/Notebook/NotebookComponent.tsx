import styled from 'styled-components';
// components
import H4 from '../Common/Title/H4';
// icons
import { BsTrash3Fill } from 'react-icons/bs';

const NotebookComponent = () => {
  return (
    <NoteBase>
      <NoteContent>
        <NoteTitle>
          <H4>단어장</H4>
          <DeleteBtn>
            <BsTrash3Fill />
          </DeleteBtn>
        </NoteTitle>

        <NoteMenu>
          <NoteList>
            <CheckBox>
              <CheckInput
                type="checkbox"
                id="agree_check_all"
                name="agree_check_all"
                checked={true}
              />
            </CheckBox>
            <WordContainer>
              <WordBox>
                <Voca>phrase</Voca>
                <Pronunciation>[pouspuomnt]</Pronunciation>
              </WordBox>

              <Meaning>V. 연기, 뒤로 미루기</Meaning>
            </WordContainer>
          </NoteList>
        </NoteMenu>
      </NoteContent>
    </NoteBase>
  );
};

export default NotebookComponent;

const NoteBase = styled.div`
  padding: 24px 16px;
`;

const NoteContent = styled.div`
  background-color: #fff68d;
`;

const NoteTitle = styled.div`
  background-color: #053790;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  color: #fff;
  border-radius: 6px 6px 0 0;
`;

const DeleteBtn = styled.button`
  font-size: 18px;
  color: #fff;
`;

const NoteMenu = styled.ul``;

const NoteList = styled.li`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #4d94e6;
`;

const CheckBox = styled.div`
  // border-right: 1px solid #4d94e6;
`;

const CheckInput = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${props => props.theme.primary_03};
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

const WordContainer = styled.div`
  padding: 0 4px;
`;

const WordBox = styled.div`
  display: flex;
  align-items: center;
`;

const Voca = styled.h4`
  font-weight: 700;
  font-size: 18px;
  margin-right: 4px;
`;

const Pronunciation = styled.span`
  font-size: 12px;
  color: ${props => props.theme.primary_06};
`;

const Meaning = styled.p`
  font-size: 13px;
`;

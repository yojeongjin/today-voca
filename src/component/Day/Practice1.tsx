import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/modules/common';
import styled from 'styled-components';
// components
import ApplyBtn from '../Common/Button/ApplyButton';
// ifs
import { DayProps } from '@/Interface/IDay';
// icons
import { PiSpeakerHighFill } from 'react-icons/pi';
import { handleApiError } from '@/utils/handleApiError';

const Practice1 = ({ onNext, dayData }: DayProps) => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // 단어 듣기
  const handlePhonetic = useCallback(async (word: string) => {
    try {
      dispatch(setLoading(true));
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await res.json();
      const audioUrl = data[0]?.phonetics?.find((p: { audio: any }) => p.audio)?.audio;

      if (!audioUrl) throw new Error('Audio not available.');

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play();
    } catch (err) {
      handleApiError(err);
    } finally {
      dispatch(setLoading(false));
    }
  }, []);

  return (
    <PracticeBase>
      <WordMenu>
        {dayData.map(data => (
          <WordItem key={data.id}>
            <VocaBox>
              <Voca>{data.word} </Voca>
              <VocaBtn
                onClick={() => {
                  handlePhonetic(data.word);
                }}
                aria-label={`${data.word} 발음 듣기`}
              >
                <PiSpeakerHighFill />
              </VocaBtn>
            </VocaBox>
            <Pronunciation>{data.phonetic && `${[data.phonetic]}`}</Pronunciation>
            <Meaning>
              {data.pos1}. {data.meaning1}
              {'  '}
              {data.pos2 && data.meaning2 ? `${data.pos2}. ${data.meaning2}` : null}
            </Meaning>
          </WordItem>
        ))}
      </WordMenu>

      <ApplyBtn onClick={onNext}>다음</ApplyBtn>
    </PracticeBase>
  );
};

export default Practice1;

const PracticeBase = styled.div`
  height: calc(100% - 70px);
  padding: 0 24px;
`;

const WordP = styled.p``;

const WordMenu = styled.ul`
  height: calc(100% - 70px);
  overflow-y: scroll;
  margin-bottom: 8px;
`;

const WordItem = styled.li`
  margin-bottom: 16px;
`;

const VocaBox = styled.div`
  display: flex;
  align-items: center;
`;

const Voca = styled.h4`
  font-weight: 700;
  font-size: 20px;
`;

const VocaBtn = styled.button`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: ${props => props.theme.primary_06};
`;

const Pronunciation = styled.span`
  font-weight: 300;
  font-size: 13px;
  color: ${props => props.theme.primary_06};
`;

const Meaning = styled.p`
  background-color: ${props => props.theme.primary_08};
  margin-top: 6px;
  padding: 14px 8px;
  border-radius: 8px;
`;

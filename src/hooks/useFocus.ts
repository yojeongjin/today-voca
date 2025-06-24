import { useRef } from 'react';

const useFocus = () => {
  const focusNum1 = useRef<HTMLInputElement>(null);
  const focusNum2 = useRef<HTMLInputElement>(null);
  const focusNum3 = useRef<HTMLInputElement>(null);
  const focusNum4 = useRef<HTMLInputElement>(null);
  const focusNum5 = useRef<HTMLInputElement>(null);

  const handleMoveFocus = (index: number) => {
    const refArr = [focusNum1, focusNum2, focusNum3, focusNum4, focusNum5];
    refArr[index]?.current?.focus();
  };

  const getCode = () => {
    return [
      focusNum1.current?.value,
      focusNum2.current?.value,
      focusNum3.current?.value,
      focusNum4.current?.value,
      focusNum5.current?.value,
    ]
      .join('')
      .trim();
  };

  return {
    focusNum1,
    focusNum2,
    focusNum3,
    focusNum4,
    focusNum5,
    handleMoveFocus,
    getCode,
  };
};

export default useFocus;

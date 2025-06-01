import { useRef } from 'react';

export default function useFocus() {
  const focusNum1 = useRef<HTMLInputElement | null>(null);
  const focusNum2 = useRef<HTMLInputElement | null>(null);
  const focusNum3 = useRef<HTMLInputElement | null>(null);
  const focusNum4 = useRef<HTMLInputElement | null>(null);
  const focusNum5 = useRef<HTMLInputElement | null>(null);

  const handleMoveFocus = (inputNum: number): void => {
    switch (inputNum) {
      case 1:
        focusNum2.current?.focus();
        break;
      case 2:
        focusNum3.current?.focus();
        break;
      case 3:
        focusNum4.current?.focus();
        break;
      case 4:
        focusNum5.current?.focus();
        break;
      default:
        return;
    }
  };

  return {
    focusNum1,
    focusNum2,
    focusNum3,
    focusNum4,
    focusNum5,
    handleMoveFocus,
  };
}

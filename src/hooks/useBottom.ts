import { useState } from 'react';

export const useBottom = () => {
  const [openBottom, setOpenBottom] = useState(false);

  return {
    openBottom,
    setOpenBottom,
  };
};

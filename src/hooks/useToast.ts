import { useState } from 'react';

export const useToast = () => {
  const [openToast, setOpenToast] = useState(false);

  return {
    openToast,
    setOpenToast,
  };
};

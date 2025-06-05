import { RootState } from '@/redux/modules/reducer';
import { useSelector } from 'react-redux';

export const useUser = () => {
  const nickname = useSelector((state: RootState) => state.auth.user.user_name);

  return nickname;
};

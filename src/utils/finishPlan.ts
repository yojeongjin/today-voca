// utils
import axios from '@/utils/axiosInstance';
import { handleApiError } from '@/utils/handleApiError';

const handleFinish = async (planId: number) => {
  try {
    const body = {
      id: planId,
    };
    const res = await axios.patch(`${process.env.NEXT_PUBLIC_APP_API_KEY}/v1/plan`, body);
    return res.data.code;
  } catch (err) {
    handleApiError(err);
  }
};

export default handleFinish;

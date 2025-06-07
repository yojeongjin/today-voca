import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_KEY,
  withCredentials: true,
});

// 요청 실패 시 인터셉터로 자동 처리
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // access token 만료일 때 한 번만 재시도 - 무한루프 방지
    if (
      error.response?.status === 401 &&
      error.response?.data?.errorCode === 'EXPIRED_ACCESS_TOKEN' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // refresh token으로 access token 재발급 요청
        await instance.get('/v1/auth/refresh-token');

        // 원래 요청 다시 시도
        return instance(originalRequest);
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;

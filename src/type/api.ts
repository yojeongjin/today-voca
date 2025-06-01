export type ApiSuccessResponse<T> = {
  success: true;
  code: number;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  code: number;
  error: {
    code: string;
    description: string;
  };
};

// 공통 타입
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

import { AxiosError } from 'axios';
import { ApiErrorResponse } from '@/type/api';

/**
 * 에러 핸들러 (공통)
 * @param error - axios 또는 일반 오류
 * @param showMessage - 메시지 표시 함수 (ex: Toast)
 */
export function handleApiError(error: unknown) {
  if (error instanceof AxiosError && error.response) {
    const res = error.response.data as ApiErrorResponse;

    alert(res.error.description);
  } else if (error instanceof Error) {
    alert(`네트워크 오류가 발생했습니다.\n다시 시도해주세요.`);
  } else {
    alert(`알 수 없는 오류가 발생했습니다.\n다시 시도해주세요.`);
  }
}

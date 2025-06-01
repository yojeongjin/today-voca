// utils/validation.ts
export const regex: Record<string, RegExp> = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  pwd: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, // 숫자, 대소문자 포함 8자 이상
  name: /^[a-zA-Z가-힣]{2,}$/, // 한글/영문 2자 이상
};

export const validateField = (name: string, value: string, comparePwd?: string): boolean => {
  if (name === 'rePwd') {
    return value === comparePwd;
  }
  return regex[name]?.test(value) || false;
};

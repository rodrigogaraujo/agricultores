export const isValidCPF = (value: string): boolean => {
  value = value.replace(/[^\d]/g, '');

  if (value.length !== 11) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(value.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;

  if (remainder !== parseInt(value.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(value.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;

  return remainder === parseInt(value.substring(10, 11));
};

export const isValidCNPJ = (value: string): boolean => {
  value = value.replace(/[^\d]/g, '');

  if (value.length !== 14) return false;

  let sum = 0;
  let remainder;
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  for (let i = 0; i < 12; i++) {
    sum += parseInt(value.charAt(i)) * weights1[i];
  }

  remainder = sum % 11;
  remainder = remainder < 2 ? 0 : 11 - remainder;

  if (remainder !== parseInt(value.charAt(12))) return false;

  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(value.charAt(i)) * weights2[i];
  }

  remainder = sum % 11;
  remainder = remainder < 2 ? 0 : 11 - remainder;

  return remainder === parseInt(value.charAt(13));
};

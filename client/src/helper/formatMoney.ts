export const formatMoney = (number: number) => {
  if (!number) return 0;
  return Number(+number.toFixed(1)).toLocaleString;
};

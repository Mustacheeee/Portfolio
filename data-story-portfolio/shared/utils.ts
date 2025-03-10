export const normalizeData = (data: number[]) => {
  const max = Math.max(...data);
  return data.map(v => v / max);
};
export const sleep = async (millis: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), millis);
  });
};

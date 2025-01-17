export enum PhoneCodes {
  US = 'US',
  IN = 'IN',
}

export type ExtractInterface<T, K extends keyof T> = {
  [P in K]: T[P];
};

export function createInterfaceExtractor<T>() {
  return <K extends keyof T>(keys: K[]) => {
    return (data: T): ExtractInterface<T, K> => {
      const result = {} as ExtractInterface<T, K>;
      keys.forEach((key) => {
        result[key] = data[key];
      });
      return result;
    };
  };
}

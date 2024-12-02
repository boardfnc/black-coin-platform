import type { QueryKey } from '@tanstack/react-query';

export const generateKey = <T = QueryKey,>(name: string, params?: object): T => {
  if (!params) return [name] as T;

  return [name].concat(Object.assign(params)) as T;
};

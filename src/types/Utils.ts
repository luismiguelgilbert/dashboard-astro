import * as outline from '@heroicons/vue/24/outline';

export type HeroIconName = keyof typeof outline;
export type IconName = | HeroIconName;

export const convertURLSearchParamsToObject = (urlSearchParams: URLSearchParams): Record<string, string | string[] | undefined> => {
  const data: Record<string, string | string[] | undefined> = {};
  for (const key of urlSearchParams.keys()) {
    const values = urlSearchParams.getAll(key);
    if (values.length > 1) {
      data[key] = values;
    } else {
      data[key] = values[0];
    }
  }

  return data;
};

import { FilterKey } from '@/reducers/search-reducer';
import { getType } from './get-key';

export const getFilters = (flatFilters: Record<string, boolean>) =>
  Object.keys(flatFilters)
    .filter((key) => flatFilters[key])
    .reduce<Partial<Record<FilterKey, string[]>>>((acc, key) => {
      const [type, uuid] = getType(key);
      const currentFilters = acc[type];

      return {
        ...acc,
        [type]: currentFilters ? currentFilters.concat([uuid]) : [uuid],
      };
    }, {});

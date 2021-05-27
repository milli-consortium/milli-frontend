import { FilterKey } from '@/reducers/search-reducer';
import { getType } from './get-key';

export const getFilters = (flatFilters: Record<string, boolean>) =>
  Object.keys(flatFilters)
    .filter((key) => flatFilters[key])
    .reduce<Partial<Record<FilterKey, string[]>>>((acc, key) => {
      const [type, uuid] = getType(key);

      return {
        ...acc,
        [type]: acc[type] ? acc[type].concat([uuid]) : [uuid],
      };
    }, {});

import { FilterKey } from '@/reducers/search-reducer';

export const getKey = (type: FilterKey, uuid: string) => `${type}-${uuid}`;

export const getType = (key: string): [Type: FilterKey, UUID: string] => [
  key.split('-')[0] as FilterKey,
  key.split('-').slice(1).join('-'),
];

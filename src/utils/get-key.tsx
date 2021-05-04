import { NiosxData_searchCollections_pageInfo_filters } from '../queries/types/NiosxData';

export const getKey = (
  type: keyof Omit<
    Omit<Omit<NiosxData_searchCollections_pageInfo_filters, 'blob'>, 'date'>,
    '__typename'
  >,
  uuid: string,
) => `${type}-${uuid}`;

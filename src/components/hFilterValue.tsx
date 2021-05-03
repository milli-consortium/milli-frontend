import React from 'react';
import { NiosxData_searchCollections_pageInfo_filters_lang } from '../queries/types/NiosxData';

export const hFilterValue = (
  f: NiosxData_searchCollections_pageInfo_filters_lang,
) => (
  <div key={f.id}>
    {f.isSelected ? '[x]' : '[_]'} {f.displayName} ({f.recordCount ?? '--'})
  </div>
);

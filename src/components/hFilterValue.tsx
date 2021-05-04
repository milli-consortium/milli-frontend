import React from 'react';
import { NiosxData_searchCollections_pageInfo_filters_lang } from '../queries/types/NiosxData';

export const hFilterValue = (
  f: Omit<NiosxData_searchCollections_pageInfo_filters_lang, 'isSelected'>,
  isSelected: boolean,
) => (
  <div key={f.id}>
    {isSelected ? '[x]' : '[_]'} {f.displayName} ({f.recordCount ?? '--'})
  </div>
);

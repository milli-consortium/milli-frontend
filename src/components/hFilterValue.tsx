import React, { MouseEventHandler } from 'react';
import { NiosxData_searchCollections_pageInfo_filters_lang } from '../queries/types/NiosxData';
import { DownOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';

export const hFilterValue = (
  f: Omit<NiosxData_searchCollections_pageInfo_filters_lang, 'isSelected'>,
  isSelected: boolean,
  handleClick: MouseEventHandler<HTMLDivElement>,
) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div key={f.id} onClick={handleClick}>
    {isSelected ? <CheckOutlined /> : <CloseOutlined />} {f.displayName} (
    {f.recordCount ?? '--'})
  </div>
);

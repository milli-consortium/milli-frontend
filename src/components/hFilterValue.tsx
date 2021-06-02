import { BorderOutlined, CheckSquareFilled } from '@ant-design/icons';
import React, { MouseEventHandler } from 'react';
import {
  NiosxData_searchCollections_pageInfo_filters_lang,
  NiosxData_searchCollections_pageInfo_filters_partners,
  NiosxData_searchCollections_pageInfo_filters_people,
  NiosxData_searchCollections_pageInfo_filters_places,
  NiosxData_searchCollections_pageInfo_filters_subjects,
} from '../queries/types/NiosxData';

export const hLanguageFilter = (
  f: Omit<NiosxData_searchCollections_pageInfo_filters_lang, 'isSelected'>,
  isSelected: boolean,
  handleClick: MouseEventHandler<HTMLDivElement>,
) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div key={f.graphId} onClick={handleClick}>
    {isSelected ? <CheckSquareFilled /> : <BorderOutlined />} {f.displayName}
  </div>
);

export const hSubjectFilter = (
  f: Omit<NiosxData_searchCollections_pageInfo_filters_subjects, 'isSelected'>,
  isSelected: boolean,
  handleClick: MouseEventHandler<HTMLDivElement>,
) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div key={f.graphId} onClick={handleClick}>
    {isSelected ? <CheckSquareFilled /> : <BorderOutlined />} {f.label}
  </div>
);

export const hPersonFilter = (
  f: Omit<NiosxData_searchCollections_pageInfo_filters_people, 'isSelected'>,
  isSelected: boolean,
  handleClick: MouseEventHandler<HTMLDivElement>,
) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div key={f.graphId} onClick={handleClick}>
    {isSelected ? <CheckSquareFilled /> : <BorderOutlined />} {f.displayName}
  </div>
);

export const hPlaceFilter = (
  f: Omit<NiosxData_searchCollections_pageInfo_filters_places, 'isSelected'>,
  isSelected: boolean,
  handleClick: MouseEventHandler<HTMLDivElement>,
) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div key={f.graphId} onClick={handleClick}>
    {isSelected ? <CheckSquareFilled /> : <BorderOutlined />} {f.displayName}
  </div>
);

export const hPartnerFilter = (
  f: Omit<NiosxData_searchCollections_pageInfo_filters_partners, 'isSelected'>,
  isSelected: boolean,
  handleClick: MouseEventHandler<HTMLDivElement>,
) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div key={f.graphId} onClick={handleClick}>
    {isSelected ? <CheckSquareFilled /> : <BorderOutlined />} {f.displayName}
  </div>
);

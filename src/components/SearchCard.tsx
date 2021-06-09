import { NiosxData_searchCollections_edges_node } from '@/queries/types/NiosxData';
import { ImageSize } from '@/types/graphql-global-types';
import React from 'react';
import '../styles/search.css';
import { dateFormat } from '../utils/format';

const DEFAULT_IMAGE =
  'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png';

type SearchProps = {
  node: NiosxData_searchCollections_edges_node;
};

const SearchCard = (props: SearchProps) => {
  const { node } = props;
  const thumbnail = node.images.find((i) => i.size === ImageSize.SMALL);

  return (
    <div className="cardHeight myCard">
      <div>
        {thumbnail ? (
          <img
            src={thumbnail.src}
            alt={thumbnail.alt ?? 'Alt-Text not found'}
            className="imageCard"
          />
        ) : (
          <img alt="placeholder" src={DEFAULT_IMAGE} className="imageCard" />
        )}
      </div>
      <div>
        <h2>{node.title}</h2>
        <h4>Partner : {node.partner.displayName}</h4>
        <h4>
          Subject :
          {node.subjects.map((item) => (
            <span className="mr10" key={item.graphId}>
              {item.label},
            </span>
          ))}
        </h4>
        <h4>Date : {dateFormat(node.dateOfCreation)}</h4>
      </div>
    </div>
  );
};

export default SearchCard;

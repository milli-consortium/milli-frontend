import React from 'react';

type FilterInfo = {
  id: string;
  displayName: string;
  recordCount?: number;
  isSelected?: boolean;
};

export const hFilterValue = (f: FilterInfo): JSX.Element => (
  <div key={f.id}>
    {f.displayName} ({f.recordCount ?? '--'})
  </div>
);

// TODO: Use fragment to simplify query
// export const query = graphql`
//   fragment FilterInfo on FilterValue {
//     id
//     displayName
//     recordCount
//     isSelected
//   }
// `;

import { Header } from '@/components/Header';
import { entityQuery } from '@/queries/entity';
import { EntityVariables, Entity } from '@/queries/types/Entity';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';

export default function EntityPage({ id }) {
  const { loading, error, data } = useQuery<Entity, EntityVariables>(
    entityQuery,
    {
      variables: {
        id,
      },
    },
  );

  return (
    <div>
      <Header title={data?.findEntity?.title ?? 'Entity Details'} />
      {loading && <div>Loading...</div>}
      {!loading && error && <div>Error: {error.message}</div>}
      {!loading && !error && data && (
        <div>
          {data.findEntity ? (
            <>
              <div>{data.findEntity.title}</div>
              <div>{data.findEntity.agencyCode}</div>
            </>
          ) : (
            'Object Not Found'
          )}
        </div>
      )}
    </div>
  );
}

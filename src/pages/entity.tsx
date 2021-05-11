import { entityQuery } from '@/queries/entity';
import { EntityVariables, Entity_findEntity } from '@/queries/types/Entity';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';

export default function Entity({ id }) {
  const { loading, error, data } = useQuery<Entity_findEntity, EntityVariables>(
    entityQuery,
    {
      variables: {
        id,
      },
    },
  );

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && data && <div>{JSON.stringify(data)}</div>}
      {!loading && error && <div>Error: {error.message}</div>}
    </div>
  );
}

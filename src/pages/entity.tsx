import { Header } from '@/components/Header';
import { entityQuery } from '@/queries/entity';
import { EntityVariables, Entity } from '@/queries/types/Entity';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import * as styles from '../styles/entity.module.css';

const Image: React.FC<{ index: number }> = ({ index }) => (
  <div className={styles.image}>This is image {index}</div>
);

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
              <div className={styles.infoBar}>{data.findEntity.title}</div>
              <div className={styles.body}>
                <div className={styles.description}>
                  {data.findEntity.description.body.value}
                </div>
                <div className={styles.container}>
                  <div className={styles.infoBar}>
                    Reference Unit / Extent / {data.findEntity.level}
                  </div>
                  <div> Author / Date / Place / Subjects / Languages </div>
                  <Image index={1} />
                  <Image index={2} />
                  <Image index={3} />
                </div>
              </div>
            </>
          ) : (
            'Object Not Found'
          )}
        </div>
      )}
    </div>
  );
}

import { entityQuery } from '@/queries/entity';
import { EntityVariables, Entity } from '@/queries/types/Entity';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import Container from '@/components/Container';
import { Row, Col, List } from 'antd';
import * as styles from '../styles/entity.module.css';

// TODO: render actual image
const Image: React.FC<{ src: string }> = ({ src }) => (
  <img className={styles.image} src={src} alt="thumbnail" />
);

type EntityProps = {
  id: string;
};

export default function EntityPage(props: EntityProps) {
  const { id } = props;
  const { loading, error, data } = useQuery<Entity, EntityVariables>(
    entityQuery,
    {
      variables: {
        id,
      },
    },
  );

  const objectIdentityList: any[] = [
    {
      label: 'Partner or Repository (URL)',
      value: data?.findEntity?.agencyCode,
    },
    {
      label: 'Partner Reference Code',
      value: data?.findEntity?.recordId,
    },
    {
      label: 'Unit ID',
      value: data?.findEntity?.unitId,
    },
    {
      label: 'Extent',
      value: data?.findEntity?.extent,
    },
    {
      label: 'Level',
      value: data?.findEntity?.level,
    },
    { label: 'Milli Reference Code', value: data?.findEntity?.graphId },
  ];

  // TODO subjects and Location fields
  const aboutObjectList: any[] = [
    { label: 'Date', value: data?.findEntity?.dateOfCreation },
    { label: 'Creator', value: data?.findEntity?.creator },
    { label: 'Location', value: '' },
    { label: 'Description', value: data?.findEntity?.description },
    // {label: "Subjects", value: data?.findEntity?.subjects},
  ];

  const subjects = data?.findEntity?.subjects.slice(0);

  const objectFormatList: any[] = [
    { label: 'Language', value: 'English' },
    { label: 'Type', value: 'Photograph' },
    { label: 'Rights', value: 'To be added' },
    { label: 'Extent', value: 'Computer print with images' },
  ];
  return (
    <Container location={data?.findEntity?.title ?? 'Entity Details'}>
      {loading && <div>Loading...</div>}
      {!loading && error && <div>Error: {error.message}</div>}
      {!loading && !error && data && (
        <div>
          {data.findEntity ? (
            <>
              <div className="container">
                <Row gutter={[16, 16]}>
                  <Col className="gutter-row" span={16}>
                    <h2>{data.findEntity.title}</h2>
                    <Image src={data?.findEntity?.images[0].src} />

                    <List
                      header={
                        <div className={styles.listHeading}>
                          About the Object
                        </div>
                      }
                      bordered
                      dataSource={aboutObjectList}
                      renderItem={(item) => (
                        <List.Item>
                          <span className={styles.txtSpacing}>
                            {item.label}
                          </span>
                          {item.value}
                        </List.Item>
                      )}
                    />

                    <List
                      header={
                        <div className={styles.listHeading}>
                          Object Format Data
                        </div>
                      }
                      itemLayout="horizontal"
                      bordered
                      dataSource={objectFormatList}
                      renderItem={(item) => (
                        <List.Item>
                          <span className={styles.txtSpacing}>
                            {item.label}
                          </span>
                          {item.value}
                        </List.Item>
                      )}
                    />
                  </Col>

                  <Col className="gutter-row" span={8}>
                    <List
                      header={
                        <div className={styles.listHeading}>
                          Object Identity
                        </div>
                      }
                      itemLayout="vertical"
                      bordered
                      dataSource={objectIdentityList}
                      renderItem={(item) => (
                        <List.Item>
                          <div>{item.label}</div>
                          <div>{item.value}</div>
                        </List.Item>
                      )}
                    />

                    <List
                      header={
                        <div className={styles.listHeading}>Access Points</div>
                      }
                      itemLayout="vertical"
                      bordered
                      dataSource={subjects}
                      renderItem={(item) => (
                        <List.Item>
                          <div>{item.prefLabel}</div>
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
              </div>
            </>
          ) : (
            'Object Not Found'
          )}
        </div>
      )}
    </Container>
  );
}

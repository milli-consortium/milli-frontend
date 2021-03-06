import Container from '@/components/Container';
import { entityQuery } from '@/queries/entity';
import {
  Entity,
  EntityVariables,
  Entity_findEntity_annotations,
} from '@/queries/types/Entity';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import Annotator from '@/components/Annotator';
import { useQuery } from '@apollo/react-hooks';
import { Col, List, Row } from 'antd';
import React, { useState } from 'react';
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
  const [isAnno, setIsAnno] = useState(false);

  const [annotations, setAnnotations] = useState<
    Entity_findEntity_annotations[] | null
  >(null);

  const { loading, error, data } = useQuery<Entity, EntityVariables>(
    entityQuery,
    {
      variables: {
        id,
      },
      onCompleted: (d) => {
        setAnnotations(d.findEntity ? [...d.findEntity.annotations] : null);
      },
    },
  );

  const updateAnno = (val: any) => {
    setAnnotations(
      annotations ? [...annotations, val.addAnnotation] : [val.addAnnotation],
    );
  };

  const openAnnotator = () => {
    setIsAnno(!isAnno);
  };

  const objectIdentityList = [
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
      value: 'Item',
    },
    { label: 'Milli Reference Code', value: data?.findEntity?.graphId },
  ];

  // TODO subjects and Location fields
  const aboutObjectList = [
    { label: 'Date', value: data?.findEntity?.dateOfCreation },
    { label: 'Creator', value: data?.findEntity?.creator },
    { label: 'Location', value: '' },
    { label: 'Description', value: data?.findEntity?.description },
    // {label: "Subjects", value: data?.findEntity?.subjects},
  ];

  const subjects = data?.findEntity?.subjects.slice(0);

  const objectFormatList = [
    { label: 'Language', value: 'English' },
    { label: 'Type', value: 'Photograph' },
    { label: 'Rights', value: '' },
    { label: 'Format', value: 'Computer print with images' },
  ];

  return (
    <Container location={data?.findEntity?.title ?? 'Entity Details'}>
      {loading && <div>Loading...</div>}
      {!loading && error && <div>Error: {error.message}</div>}
      {!loading && !error && data && (
        <div>
          {data.findEntity ? (
            <>
              <div className={styles.wrapper}>
                <Row gutter={[16, 16]}>
                  <Col className="gutter-row" span={16}>
                    <h2>{data.findEntity.title}</h2>
                    <Image src={data?.findEntity?.images[0].src} />
                    <List
                      header={
                        <div className={styles.listHeading}>
                          About the Object
                          <span className={styles.alignRight}>
                            <EditOutlined
                              className={styles.iconStyles}
                              onClick={openAnnotator}
                            />
                            <EyeOutlined className={styles.iconStyles} />
                          </span>
                        </div>
                      }
                      bordered
                      dataSource={aboutObjectList}
                      renderItem={(item) => (
                        <List.Item>
                          <div className={styles.fullWidth}>
                            <Row gutter={[16, 16]}>
                              <Col className="gutter-row" span={4}>
                                {item.label}
                              </Col>
                              <Col className="gutter-row" span={20}>
                                {
                                  // @ts-expect-error: ignore
                                  item.value && item.value.trim()
                                    ? item.value
                                    : 'Unknown'
                                }
                              </Col>
                            </Row>
                          </div>
                        </List.Item>
                      )}
                    />

                    <Annotator
                      visible={isAnno}
                      data={data}
                      updateAnno={updateAnno}
                    />

                    <List
                      header={
                        <div className={styles.listHeading}>
                          Object Format Data
                          <span className={styles.alignRight}>
                            {/* <EditOutlined className={styles.iconStyles} />
                            <EyeOutlined className={styles.iconStyles} /> */}
                          </span>
                        </div>
                      }
                      itemLayout="horizontal"
                      bordered
                      dataSource={objectFormatList}
                      renderItem={(item) => (
                        <List.Item>
                          <div className={styles.fullWidth}>
                            <Row gutter={[16, 16]}>
                              <Col className="gutter-row" span={4}>
                                {item.label}
                              </Col>
                              <Col className="gutter-row" span={20}>
                                {item.value || 'Unknown'}
                              </Col>
                            </Row>
                          </div>
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
                        <div className={styles.listHeading}>
                          Access Points (Subject Headings)
                        </div>
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
                    {annotations ? (
                      <List
                        header={
                          <div className={styles.listHeading}>Annotations</div>
                        }
                        itemLayout="vertical"
                        bordered
                        dataSource={annotations}
                        renderItem={(item) => (
                          <List.Item key={item.graphId}>
                            <div
                              style={{
                                borderBottom: '1px solid #eee',
                                marginBottom: '8px',
                              }}
                            >
                              Annotation Body:{' '}
                              <i>{item.body ? item.body[0].value : 'Empty'}</i>
                            </div>
                            <div>Author: {item.creator.name}</div>

                            <div>Motivation: {item.motivation}</div>
                            <div>Agent: {item.creator.nickname}</div>
                          </List.Item>
                        )}
                      />
                    ) : (
                      'No Annotations Found'
                    )}
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

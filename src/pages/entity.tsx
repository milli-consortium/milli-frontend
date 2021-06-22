import Container from '@/components/Container';
import { entityQuery } from '@/queries/entity';
import {
  Entity,
  EntityVariables,
  Entity_findEntity_annotations,
} from '@/queries/types/Entity';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Col, List, notification, Row } from 'antd';
import React, { useState } from 'react';
import { addAnnotationMutation } from '../mutations/add-annotation';
import {
  AnnotationInput,
  AnnotationInputVariables,
} from '../mutations/types/AnnotationInput';
import * as styles from '../styles/entity.module.css';

// TODO: render actual image
const Image: React.FC<{ src: string }> = ({ src }) => (
  <img className={styles.image} src={src} alt="thumbnail" />
);

type EntityProps = {
  id: string;
};

const isValidAnnotation = (
  values: unknown,
): values is AnnotationInputVariables => {
  throw new Error('Not Implemented');
};

export default function EntityPage(props: EntityProps) {
  const { id } = props;

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

  const objectFormatList = [
    { label: 'Language', value: 'English' },
    { label: 'Type', value: 'Photograph' },
    { label: 'Rights', value: 'To be added' },
    { label: 'Format', value: 'Computer print with images' },
  ];

  const [addAnnotation, { loading: addAnnotationLoading }] = useMutation<
    AnnotationInput,
    AnnotationInputVariables
  >(addAnnotationMutation, {
    onCompleted: (val) => {
      if (val.addAnnotation)
        setAnnotations(
          annotations
            ? [...annotations, val.addAnnotation]
            : [val.addAnnotation],
        );
      // eslint-disable-next-line no-console
      else console.error('Failed to create annotation');
    },
    onError: (err) =>
      notification.open({
        message: err.name,
        description: err.message,
      }),
  });

  const handleSubmit = (values: unknown) => {
    if (isValidAnnotation(values)) {
      addAnnotation({
        variables: values,
      });
    }
  };

  const onFinishFailed = () => {
    notification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

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
                            <EditOutlined className={styles.iconStyles} />
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
                                {item.value}
                              </Col>
                            </Row>
                          </div>
                        </List.Item>
                      )}
                    />

                    <List
                      header={
                        <div className={styles.listHeading}>
                          Object Format Data
                          <span className={styles.alignRight}>
                            <EditOutlined className={styles.iconStyles} />
                            <EyeOutlined className={styles.iconStyles} />
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
                                {item.value}
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
                            <div>{item.motivation}</div>
                            <div>{item.body ? item.body[0].value : ''}</div>
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

import Container from '@/components/Container';
import { entityQuery } from '@/queries/entity';
import {
  Entity,
  EntityVariables,
  Entity_findEntity_annotations,
} from '@/queries/types/Entity';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  List,
  notification,
  Row,
  Select,
  Spin,
} from 'antd';
import React, { useState } from 'react';
import { addAnnotationMutation } from '../mutations/add-annotation';
import {
  AnnotationInput,
  AnnotationInputVariables,
} from '../mutations/types/AnnotationInput';
import * as styles from '../styles/entity.module.css';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

// TODO: render actual image
const Image: React.FC<{ src: string }> = ({ src }) => (
  <img className={styles.image} src={src} alt="thumbnail" />
);

type EntityProps = {
  id: string;
};

interface FormValues {
  readonly type: string;
  readonly value: string;
  readonly concept: string | null;
  readonly motivation: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
const hasOwnProperty = <X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> =>
  Object.prototype.hasOwnProperty.call(obj, prop);

const isValidAnnotation = (values: unknown): values is FormValues =>
  typeof values === 'object' &&
  values !== null &&
  hasOwnProperty(values, 'type') &&
  typeof values.type === 'string' &&
  hasOwnProperty(values, 'value') &&
  typeof values.value === 'string' &&
  hasOwnProperty(values, 'concept') &&
  typeof values.concept === 'string' &&
  hasOwnProperty(values, 'motivation') &&
  typeof values.motivation === 'string';

export default function EntityPage(props: EntityProps) {
  const { id } = props;
  const formRef = React.createRef<FormInstance>();

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

  const handleSubmit = (values: Record<string, unknown>) => {
    // eslint-disable-next-line no-console
    console.log('form Values: ', values, isValidAnnotation(values));
    if (isValidAnnotation(values) && data?.findEntity) {
      const { graphId: targetId, title: source } = data.findEntity;

      addAnnotation({
        variables: {
          motivation: values.motivation,
          targetId,
          target: { targetId, source },
          body: {
            typ: values.type,
            value: values.value,
            motivation: values.motivation,
            language: 'en',
            format: 'unknown',
            creator: 'dummyValue',
          },
        },
      });
    } else {
      throw new Error('Invalid values or Entity not available');
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
                    <Card title="Add New Annotation">
                      <Form
                        {...layout}
                        ref={formRef}
                        name="control-ref"
                        onFinish={handleSubmit}
                        onError={onFinishFailed}
                      >
                        <Form.Item
                          name="type"
                          label="Type"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name="concept"
                          label="Concept"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name="motivation"
                          label="Motivation"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Select placeholder="Select a option" allowClear>
                            <Option value="describe">Add Description</Option>
                            <Option value="correct">Suggest Correction</Option>
                            <Option value="other">Other</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="value"
                          label="Value"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                          <Button
                            type="primary"
                            htmlType="submit"
                            disabled={addAnnotationLoading}
                          >
                            {!addAnnotationLoading ? 'Submit' : <Spin />}
                          </Button>
                        </Form.Item>
                      </Form>
                    </Card>
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

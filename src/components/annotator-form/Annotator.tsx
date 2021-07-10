/* eslint-disable */
import { useMutation } from '@apollo/react-hooks';
import {
  Button,
  Card,
  DatePicker,
  Form,
  FormInstance,
  Input,
  notification,
  Radio,
  Spin,
} from 'antd';
import React, { useState } from 'react';
import { addAnnotationMutation } from '../../mutations/add-annotation';
import {
  AnnotationInput,
  AnnotationInputVariables,
} from '../../mutations/types/AnnotationInput';
import { isValidAnnotation } from './isValidAnnotation';

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

export interface FormValues {
  readonly type: string;
  readonly value: string;
  readonly concept: string | null;
  readonly motivation: string;
  readonly date?: object;
}

interface AnnotatorProps {
  data: any;
  updateAnno: (arg: any) => void;
  visible: boolean;
}

const dateInputConfig = {
  rules: [
    {
      type: 'object' as const,
      required: false,
      message: 'Please select time!',
    },
  ],
};

const Annotator: React.FC<AnnotatorProps> = ({ data, updateAnno, visible }) => {
  const formRef = React.createRef<FormInstance>();
  const [selectedPurpose, setPurpose] = useState('');
  const [addAnnotation, { loading: addAnnotationLoading }] = useMutation<
    AnnotationInput,
    AnnotationInputVariables
  >(addAnnotationMutation, {
    onCompleted: (val) => {
      if (val.addAnnotation) updateAnno(val);
      // eslint-disable-next-line no-console
      else console.error('Failed to create annotation');
    },
    onError: (err) =>
      notification.open({
        message: err.name,
        description: err.message,
      }),
  });

  const handleSubmit = (values: Record<string, any>) => {
    // eslint-disable-next-line no-console
    console.log('form Values: ', values, isValidAnnotation(values));
    if (data?.findEntity) {
      const { graphId: targetId, title: source } = data.findEntity;

      addAnnotation({
        variables: {
          motivation: selectedPurpose === 'all' ? 'commenting' : 'describing',
          targetId,
          target: { targetId, source },
          body: {
            typ: 'TextualBody',
            value:
              selectedPurpose === 'date'
                ? values.date.toISOString()
                : values.value,
            motivation: selectedPurpose === 'all' ? 'commenting' : 'describing',
            language: 'en',
            format: 'Plain Text',
            creator: 'Mr. Mock Agent',
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
    <>
      <Card
        title="Add New Annotation"
        className={visible ? 'annoShow' : 'annoHide'}
      >
        <Form
          {...layout}
          ref={formRef}
          name="control-ref"
          onFinish={handleSubmit}
          onError={onFinishFailed}
        >
          <Form.Item
            name="purpose"
            label="What do you want to annotate?"
            rules={[{ required: true, message: 'Please pick an item!' }]}
          >
            <Radio.Group>
              <Radio.Button value="date" onClick={() => setPurpose('date')}>
                Date
              </Radio.Button>
              <Radio.Button
                value="creator"
                onClick={() => setPurpose('creator')}
              >
                Creator
              </Radio.Button>
              <Radio.Button
                value="description"
                onClick={() => setPurpose('description')}
              >
                Description
              </Radio.Button>
              <Radio.Button
                value="location"
                onClick={() => setPurpose('location')}
              >
                Location
              </Radio.Button>
              <Radio.Button
                value="subject"
                onClick={() => setPurpose('subject')}
              >
                Subject
              </Radio.Button>
              <Radio.Button value="all" onClick={() => setPurpose('all')}>
                Everything here
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="date"
            label="Choose a Date"
            {...dateInputConfig}
            hidden={selectedPurpose !== 'date'}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="value"
            label="Value"
            hidden={selectedPurpose === 'date'}
            rules={[
              {
                required: false,
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
    </>
  );
};

export default Annotator;

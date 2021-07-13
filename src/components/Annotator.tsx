/* eslint-disable */
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  Radio,
  notification,
  Spin,
  DatePicker,
} from 'antd';
import { addAnnotationMutation } from '../mutations/add-annotation';
import {
  AnnotationInput,
  AnnotationInputVariables,
} from '../mutations/types/AnnotationInput';

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

interface FormValues {
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

// eslint-disable-next-line @typescript-eslint/ban-types
const hasOwnProperty = <X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> =>
  Object.prototype.hasOwnProperty.call(obj, prop);

/*const isValidAnnotation = (values: unknown): values is FormValues =>
  (typeof values === 'object' &&
    values !== null &&
    // hasOwnProperty(values, 'type') &&
    // typeof values.type === 'string' &&
    hasOwnProperty(values, 'value') &&
    typeof values.value === 'string') ||
  (hasOwnProperty(values, 'date') && typeof values.date === 'object');
// hasOwnProperty(values, 'concept') &&
// typeof values.concept === 'string' &&
// hasOwnProperty(values, 'motivation') &&
// typeof values.motivation === 'string';
*/
const Annotator: React.FC<AnnotatorProps> = ({ data, updateAnno, visible }) => {
  const formRef = React.createRef<FormInstance>();
  const [selectedPurpose, setPurpose] = useState('');
  const dateInputConfig = {
    rules: [
      {
        type: 'object' as const,
        required: false,
        message: 'Please select time!',
      },
    ],
  };
  console.log(visible, 'anno visible');
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
    if (data?.findEntity) {
      const { graphId: targetId, title: source } = data.findEntity;
      const concept: any = new Object();
      concept['type'] = 'concept';
      concept[selectedPurpose] = values.concept;
      // eslint-disable-next-line no-console
      console.log(
        'form Values: ',
        values,
        JSON.stringify(concept) /*, isValidAnnotation(values)*/,
      );

      addAnnotation({
        variables: {
          motivation: selectedPurpose === 'all' ? 'commenting' : 'describing',
          targetId,
          target: { targetId, source },
          concept: JSON.stringify(concept),
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
            label="Choose a field"
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
            name="concept"
            label="Why"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
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

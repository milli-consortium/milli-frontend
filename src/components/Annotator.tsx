import React, { useState } from 'react';
import { Form, Input, Checkbox, Radio, DatePicker, Button } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

export const Annotator = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [selectedPurpose, setPurpose] = useState('date');

  const config = {
    rules: [
      {
        type: 'object' as const,
        required: false,
        message: 'Please select time!',
      },
    ],
  };

  const handleSubmit = () => {
    // console.log('Received values of form:', values);
  };

  const onFinishFailed = () => {
    // console.log('Received values of form:', values);
  };

  return (
    <>
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{ visible: true }}
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Private" name="public" valuePropName="checked">
          <Checkbox>Set to Private</Checkbox>
        </Form.Item>
        {/* TODO: dynamic field rendering */}

        <Form.Item
          name="purpose"
          label="What do you want to annotate?"
          rules={[{ required: true, message: 'Please pick an item!' }]}
        >
          <Radio.Group>
            <Radio.Button value="date" onClick={() => setPurpose('date')}>
              Date
            </Radio.Button>
            <Radio.Button value="creator" onClick={() => setPurpose('creator')}>
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
            <Radio.Button value="subject" onClick={() => setPurpose('subject')}>
              Subject
            </Radio.Button>
            <Radio.Button value="all" onClick={() => setPurpose('all')}>
              Everything here
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="date-picker"
          label="DatePicker"
          {...config}
          hidden={selectedPurpose !== 'date'}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="creator-input"
          label="Creator"
          hidden={selectedPurpose !== 'creator'}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description-input"
          label="Description"
          hidden={selectedPurpose !== 'description'}
        >
          <TextArea autoSize />
        </Form.Item>

        <Form.Item
          name="location-input"
          label="Location"
          hidden={selectedPurpose !== 'location'}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="subject-input"
          label="Subject"
          hidden={selectedPurpose !== 'subject'}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="comment-input"
          label="Comment"
          hidden={selectedPurpose !== 'all'}
        >
          <TextArea autoSize />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

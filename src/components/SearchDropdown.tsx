import React from 'react';
import * as styles from '../styles/search.module.css';
import { Flex, WhiteSpace } from 'antd-mobile';
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined, CheckOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../styles/search.css';

export const SearchDropdown = ({ list, first }) => {
  const menu = (
    <Menu>
      {list &&
        list.map((item, index) => (
          <Menu.Item key={index} icon={<CheckOutlined />}>
            {item}
          </Menu.Item>
        ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button>
        {first} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default SearchDropdown;

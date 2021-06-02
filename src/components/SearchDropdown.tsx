import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import '../styles/search.css';

type SearchDropDownProps = {
  list: string[];
  first: string;
};

export const SearchDropdown = (props: SearchDropDownProps) => {
  const { list, first } = props;
  const menu = (
    <Menu>
      {list &&
        list.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
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

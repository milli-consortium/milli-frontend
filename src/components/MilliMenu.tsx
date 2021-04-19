import { MenuOutlined } from '@ant-design/icons';
/* eslint global-require:0, no-nested-ternary:0 */
import { ActivityIndicator, Menu, NavBar } from 'antd-mobile';
import React from 'react';

const data = [
  {
    value: '1',
    label: 'Home',
  },
  {
    value: '2',
    label: 'Collections',
  },
  {
    value: '3',
    label: 'Partners',
    isLeaf: true,
  },
];

const isBrowser = typeof document !== 'undefined';

class MilliMenu extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      initData: '',
      show: false,
    };
  }

  onChange = (value) => {
    let label = '';
    data.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        label = dataItem.label;
        if (dataItem.children && value[1]) {
          dataItem.children.forEach((cItem) => {
            if (cItem.value === value[1]) {
              label += ` ${cItem.label}`;
            }
          });
        }
      }
    });
    console.log(label);
  };

  handleClick = (e) => {
    e.preventDefault(); // Fix event propagation on Android
    const { show, initData } = this.state;

    this.setState({
      show: !show,
    });
    // mock for async data loading
    if (!initData) {
      setTimeout(() => {
        this.setState({
          initData: data,
        });
      }, 500);
    }
  };

  onMaskClick = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const { initData, show } = this.state;
    const height = isBrowser ? document.documentElement.clientHeight * 0.6 : 20;
    const menuEl = (
      <Menu
        className="milli-menu container"
        data={initData}
        value={['1']}
        level={1}
        onChange={this.onChange}
        height={height}
      />
    );
    const loadingEl = (
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </div>
    );
    return (
      <div className={show ? 'single-menu-active' : ''}>
        <div className="container">
          <NavBar
            role="presentation"
            leftContent={<MenuOutlined />}
            rightContent=""
            mode="light"
            onLeftClick={this.handleClick}
            className="single-top-nav-bar"
          >
            <div className="logo margin-auto">M1ll1</div>
          </NavBar>
        </div>
        {show ? (initData ? menuEl : loadingEl) : null}
        {show ? (
          <div
            className="menu-mask"
            onClick={this.onMaskClick}
            role="presentation"
          />
        ) : null}
      </div>
    );
  }
}

export default MilliMenu;

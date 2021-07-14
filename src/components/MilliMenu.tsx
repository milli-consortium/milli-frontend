// import { MenuOutlined } from '@ant-design/icons';
/* eslint global-require:0, no-nested-ternary:0 */
import { ActivityIndicator, Menu, NavBar } from 'antd-mobile';
import { ValueType } from 'antd-mobile/lib/menu/PropsType';
import React from 'react';

type MenuItem = {
  value: '1' | '2' | '3' | '4' | '5';
  label: string;
  children?: MenuItem[];
};

const data: MenuItem[] = [
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
  },
  {
    value: '4',
    label: 'Search',
  },
  {
    value: '5',
    label: 'Contact',
  },
];

const isBrowser = typeof document !== 'undefined';

type MenuState = {
  initData?: MenuItem[];
  show: boolean;
};
class MilliMenu extends React.Component<Record<string, unknown>, MenuState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      show: false,
    };
  }

  onChange = (_value?: ValueType) => {
    // let label = '';
    // data.forEach((dataItem) => {
    //   if (dataItem.value === value[0]) {
    //     label = dataItem.label;
    //     if (dataItem.children && value[1]) {
    //       dataItem.children.forEach((cItem) => {
    //         if (cItem.value === value[1]) {
    //           label += ` ${cItem.label}`;
    //         }
    //       });
    //     }
    //   }
    // });
    // console.info(label);
  };

  handleClick = () => {
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
            leftContent=""
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

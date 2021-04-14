import React from 'react';

import { Carousel, WingBlank } from 'antd-mobile';

class HeroSlides extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: ['1', '2', '3'],
      imgHeight: 176,
    };
  }

  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: [
          'AiyWuByWklrrUDlFignR',
          'TekJlZRVCjLFexlOCuWn',
          'IJOtIlfsYdTyaDTRVrLI',
        ],
      });
    }, 100);
  }

  render() {
    const { data, imgHeight } = this.state;
    return (
      <WingBlank>
        <Carousel
          autoplay
          infinite
          beforeChange={(from, to) =>
            console.log(`slide from ${from} to ${to}`)
          }
          afterChange={(index) => console.log('slide to', index)}
        >
          {data.map((val) => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{
                display: 'inline-block',
                width: '100%',
                height: imgHeight,
              }}
            >
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}

export default HeroSlides;

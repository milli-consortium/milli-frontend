import React, { useReducer } from 'react';
import * as styles from '../styles/search.module.css';
import '../styles/search.css';
import { Accordion, List } from 'antd-mobile';
import { hFilterValue } from '@/components/hFilterValue';
import { filterReducer } from '@/reducers/search-reducer';
import { getKey } from '../utils/get-key';

const SearchAccordion = ({ title, items }) => {
  const [filters, dispatch] = useReducer(filterReducer, {});
  return (
    <div className="mtb10">
      <Accordion defaultActiveKey="0" className={styles.myAccordion}>
        <Accordion.Panel header={title}>
          <List>
            {items &&
              items.map((x, index) => (
                <List.Item key={index}>
                  {hFilterValue(x, filters[getKey('lang', x.id)], () => {
                    dispatch({
                      type: 'TOGGLE',
                      payload: getKey('lang', x.id),
                    });
                  })}
                </List.Item>
              ))}
          </List>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default SearchAccordion;

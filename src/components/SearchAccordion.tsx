import React, { useReducer } from 'react';
import * as styles from '../styles/search.module.css';
import '../styles/search.css';
import { Accordion, List } from 'antd-mobile';
import { hFilterValue } from '@/components/hFilterValue';
import { getKey } from '../utils/get-key';
import { filterReducer } from '@/reducers/search-reducer';

const SearchAccordion = ({ title, items }) => {
  const [filters, dispatch] = useReducer(filterReducer, {});

<<<<<<< HEAD
        return (
            <div className="mtb10">
                <Accordion defaultActiveKey="0" className={styles.myAccordion}>
                    <Accordion.Panel header={title}>
                        <List>
                            {
                                items && items.map((x, index) => (
                                    <List.Item key={index}>
                                        {
                                            hFilterValue(x, filters[getKey('lang', x.id)], () => {
                                                dispatch({
                                                  type: 'TOGGLE',
                                                  payload: getKey('lang', x.id),
                                                });
                                              })
                                        }
                                    </List.Item>
                                ))
                            }
                        </List>
                    </Accordion.Panel>
                </Accordion>
            </div>
        )
}
=======
  return (
    <div style={{ marginTop: 10, marginBottom: 10 }}>
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
>>>>>>> 536ec542272c49fe57e5268af15321dd6a6b0558

export default SearchAccordion;

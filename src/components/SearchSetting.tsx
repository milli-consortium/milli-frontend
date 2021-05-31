import React from 'react';
import * as styles from '../styles/search.module.css';
import { Flex } from 'antd-mobile';
import SearchDropdown from '@/components/SearchDropdown';

const sortbyData = ["Relevance", "sort1", "sort2", "sort3"]
const perPages = ["10", "20", "50", "100"]

class SearchSetting extends React.Component<Record<string, unknown>> {
    render() {
        return (
            <div className={styles.flexContainer}>
                <Flex>
                    <Flex.Item><span className="font20">Results: 1-10 of 900</span></Flex.Item>
                    <Flex.Item>
                            <Flex>
                                <Flex.Item>
                                    <span className="font20 mr10 fleft">Sort by:</span><SearchDropdown list={sortbyData} first="relevance" />
                                </Flex.Item>
                                <Flex.Item>
                                    <div className="alignRight">
                                        <span className="font20 mr10 fleft">Items per page:</span><SearchDropdown list={perPages} first="10" />
                                    </div>
                                </Flex.Item>
                            </Flex>
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
}

export default SearchSetting;
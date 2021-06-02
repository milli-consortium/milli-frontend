import { assert } from 'chai';
import { getFilters } from './get-filters';
import { getKey } from './get-key';

describe('getFilters', () => {
  it('should return IDs of all selected filters of each filter-type', () => {
    const actual = getFilters({
      [getKey('lang', '1')]: true,
      [getKey('lang', '2')]: false,
      [getKey('lang', '3')]: true,
      [getKey('people', '1')]: true,
      [getKey('people', '2')]: false,
      [getKey('partners', '1')]: false,
    });

    const expected = {
      lang: ['1', '3'],
      people: ['1'],
    };

    assert.deepEqual(actual, expected);
  });
});

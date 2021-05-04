import { assert } from 'chai';
import { filterReducer } from './search-reducer';

describe('filterReducer', () => {
  describe('SET', () => {
    it('should update payload in state', () => {
      const init = {};
      const actual = filterReducer(init, {
        type: 'SET',
        payload: {
          a: true,
          b: false,
        },
      });
      const expected = {
        a: true,
        b: false,
      };
      assert.deepEqual(actual, expected);
    });
  });
});

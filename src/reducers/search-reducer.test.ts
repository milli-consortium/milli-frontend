import { assert } from 'chai';
import { filterReducer } from './search-reducer';

describe('filterReducer', () => {
  describe('SET', () => {
    it('should update state with payload as is', () => {
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
  describe('TOGGLE', () => {
    it('should set TRUE for the given key if previously false', () => {
      const init = {
        a: false,
        b: false,
      };
      const actual = filterReducer(init, {
        type: 'TOGGLE',
        payload: 'a',
      });

      assert.isTrue(actual.a);
    });
    it('should set FALSE for the given key if previously true', () => {
      const init = {
        a: false,
        b: true,
      };
      const actual = filterReducer(init, {
        type: 'TOGGLE',
        payload: 'b',
      });

      assert.isFalse(actual.b);
    });
  });
});

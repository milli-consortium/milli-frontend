import { assert } from 'chai';
import { getKey, getType } from './get-key';

describe('getKey', () => {
  it('should combine key and id', () => {
    const actual = getKey('lang', '234-dasf-323-fd-23');
    const expected = 'lang-234-dasf-323-fd-23';

    assert.strictEqual(actual, expected);
  });
});

describe('getType', () => {
  it('should extract type from combined-key', () => {
    const [actual] = getType('lang-234-dasf-323-fd-23');
    const expected = 'lang';

    assert.strictEqual(actual, expected);
  });
  it('should extract UUID from combined-key', () => {
    const [, actual] = getType('lang-234-dasf-323-fd-23');
    const expected = '234-dasf-323-fd-23';

    assert.strictEqual(actual, expected);
  });
});

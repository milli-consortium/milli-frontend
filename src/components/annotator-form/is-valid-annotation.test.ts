import { assert } from 'chai';
import { isValidAnnotation } from './is-valid-annotation';

describe('isValidAnnotation', () => {
  it('should return false if input is null', () => {
    assert.isFalse(isValidAnnotation(null));
  });
  it('should return false if input is not an object', () => {
    assert.isFalse(isValidAnnotation('Hello world'));
  });
  it('should return false if `type` key is missing', () => {
    assert.isFalse(isValidAnnotation({}));
  });
  it('should return false if `type` key has a non-string value', () => {
    assert.isFalse(
      isValidAnnotation({
        type: 1,
      }),
    );
  });
  it('should return false if `value` key is missing', () => {
    assert.isFalse(isValidAnnotation({}));
  });
  it('should return false if `value` key has a non-string value', () => {
    assert.isFalse(
      isValidAnnotation({
        value: 1,
      }),
    );
  });
  it('should return false if `concept` key is missing', () => {
    assert.isFalse(isValidAnnotation({}));
  });
  it('should return false if `concept` key has a non-string value', () => {
    assert.isFalse(
      isValidAnnotation({
        concept: 1,
      }),
    );
  });
  it('should return false if `motivation` key is missing', () => {
    assert.isFalse(isValidAnnotation({}));
  });
  it('should return false if `motivation` key has a non-string value', () => {
    assert.isFalse(
      isValidAnnotation({
        motivation: 1,
      }),
    );
  });
  it('should return true `date` key is missing', () => {
    assert.isTrue(
      isValidAnnotation({
        type: 'a',
        value: 'b',
        concept: 'c',
        motivation: 'd',
      }),
    );
  });
  it('should return false if `date` key is not an object', () => {
    assert.isFalse(
      isValidAnnotation({
        type: 'a',
        value: 'a',
        concept: 'a',
        motivation: 'a',
        date: 1,
      }),
    );
  });
  it('should return true if `date` key is a date-object', () => {
    assert.isTrue(
      isValidAnnotation({
        type: 'a',
        value: 'a',
        concept: 'a',
        motivation: 'a',
        date: {},
      }),
    );
  });
});

import { hasOwnProperty } from '../../utils/hasOwnProperty';
import { FormValues } from './Annotator';

export const isValidAnnotation = (values: unknown): values is FormValues =>
  typeof values === 'object' &&
  values !== null &&
  ['type', 'value', 'concept', 'motivation'].every(
    (k) => hasOwnProperty(values, k) && typeof values[k] === 'string',
  ) &&
  (!hasOwnProperty(values, 'date') ||
    (hasOwnProperty(values, 'date') && typeof values.date === 'object'));

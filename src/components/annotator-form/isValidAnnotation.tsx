import { hasOwnProperty } from '@/utils/hasOwnProperty';
import { FormValues } from './Annotator';

export const isValidAnnotation = (values: unknown): values is FormValues =>
  typeof values === 'object' &&
  values !== null &&
  hasOwnProperty(values, 'type') &&
  typeof values.type === 'string' &&
  hasOwnProperty(values, 'value') &&
  typeof values.value === 'string' &&
  hasOwnProperty(values, 'concept') &&
  typeof values.concept === 'string' &&
  hasOwnProperty(values, 'motivation') &&
  typeof values.motivation === 'string' &&
  hasOwnProperty(values, 'date') &&
  typeof values.date === 'object';

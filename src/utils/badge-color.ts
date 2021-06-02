import { FilterKey } from '@/reducers/search-reducer';

export const badgeColors: Record<
  FilterKey,
  { backgroundColor: string; color?: string }
> = {
  lang: { backgroundColor: '#f1c40f', color: '#2c3e50' },
  dateRange: { backgroundColor: '#34495e', color: '#ecf0f1' },
  partners: { backgroundColor: '#2ecc71', color: '#2c3e50' },
  people: { backgroundColor: '#3498db' },
  places: { backgroundColor: '#e74c3c' },
  subjects: { backgroundColor: '#ecf0f1', color: '#2c3e50' },
};

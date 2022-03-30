import { Filter } from './filter';

export interface FilterQuery {
  page: string,
  [Filter.COLOR]?: string,
  [Filter.MANUFACTURER]?: string,
}

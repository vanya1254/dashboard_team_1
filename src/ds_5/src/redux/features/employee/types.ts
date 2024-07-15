//@ts-ignore
import { IKoobDataRequest3 } from 'bi-internal/services/koob';

export interface EmployerState {
  data: any[];
}

export type FetchCoobDataPropsT = {
  // koobId: string;
  dimensions: string[];
  measures: string[];
  allFilters: any;
  request?: IKoobDataRequest3 | { schema_name: string };
  comment?: string;
};

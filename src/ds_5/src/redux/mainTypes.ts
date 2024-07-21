//@ts-ignore
import { IKoobDataRequest3 } from 'bi-internal/services/koob';

export enum Status {
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED'
}

export interface CoobDataI {
  [key: string]: string;
}

export type KoobIdT = string;
export type DimensionsT = string[];
export type MeasuresT = string[];
export type AllFiltersT = {
  [key: string]: any[];
};
export type RequestT = IKoobDataRequest3 | { schema_name: string };
export type CommentT = string;

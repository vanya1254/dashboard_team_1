//@ts-ignore
import { IKoobDataRequest3 } from 'bi-internal/services/koob';

export enum Status {
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED'
}

export interface CoobDataI {
  [key: string]: string | number;
}

export type KoobIdT = string;
export type DimensionsT = string[];
export type MeasuresT = string[];
export type AllFiltersT = {
  [key: string]: FilterT;
};
export type RequestT = IKoobDataRequest3 | { schema_name: string };
export type CommentT = string;

export type FilterT =
  | any[]
  | [string, [string, string], [string, string]]
  | [string, [string, number], [string, number]];

export type SkillT = {
  skill: string;
  curSkills: string[];
  nextSkills: string[];
};

export type EmployeeT = {
  fullname: string;
  position: string;
  department: string;
  fact_empl_skills_employee_key: number;
  picture_url: string;
};

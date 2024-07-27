import { AllFiltersT, CoobDataI, EmployeeT, RequestT, SkillT, Status } from '../../mainTypes';

export interface EmpDashState {
  employee: EmployeeT;
  data: CoobDataI[][];
  empSkillsList: SkillT[];
  empRadar: EmpRadarT[];
  empCard: EmpCardT[];
  empStackedArea: EmpStackedAreaT[][];
  empBar: EmpBarT[];
  status: Status;
}

export type FetchEmpDashPropsT = {
  allFilters: AllFiltersT;
  request?: RequestT;
};

export type EmpCardT = { skill_type: string; value: string[] };

export type EmpRadarT = { skill_type: string; level: number; midLevel: number };

export type EmpStackedAreaT = { name: string; level: number };

export type EmpBarT = { skill: string; 2022: number; 2023: number };

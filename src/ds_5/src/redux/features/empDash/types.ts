import { AllFiltersT, CommentT, CoobDataI, EmployeeT, RequestT, SkillT, Status } from '../../mainTypes';

export interface EmpDashState {
  employee: EmployeeT;
  data: CoobDataI[][];
  empSkillsList: SkillT[];
  empRadar: EmpRadarT[];
  empCard: EmpCardT[];
  empStackedArea: EmpStackedAreaT[][];
  status: Status;
}

export type FetchEmpDashPropsT = {
  allFilters: AllFiltersT;
  request?: RequestT;
};

export type EmpCardT = { skill_type: string; value: string[] };

export type EmpRadarT = { skill_type: string; level: number; midLevel: number };

export type EmpStackedAreaT = { name: string; level: number };

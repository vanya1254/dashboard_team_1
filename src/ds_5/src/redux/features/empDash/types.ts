import { AllFiltersT, CommentT, CoobDataI, EmployeeT, RequestT, SkillT, Status } from '../../mainTypes';

export interface EmpDashState {
  employee: EmployeeT;
  data: CoobDataI[][];
  empSkillsList: SkillT[];
  empCard: EmpCardT[];
  status: Status;
}

export type FetchEmpDashPropsT = {
  allFilters: AllFiltersT;
  request?: RequestT;
};

export type EmpCardT = { skill_type: string; value: string[] };

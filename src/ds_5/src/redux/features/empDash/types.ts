import { AllFiltersT, CommentT, CoobDataI, EmployeeT, RequestT, SkillT, Status } from '../../mainTypes';

export interface EmpDashState {
  employee: EmployeeT;
  data: CoobDataI[];
  empSkillsList: SkillT[];
  status: Status;
}

export type FetchEmpDashPropsT = {
  allFilters: AllFiltersT;
  request?: RequestT;
  comment?: CommentT;
};

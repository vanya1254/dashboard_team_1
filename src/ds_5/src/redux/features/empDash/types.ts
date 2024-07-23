import { CommentT, CoobDataI, EmployeeT, RequestT, SkillT, Status } from '../../mainTypes';

export interface EmpDashState {
  employee: EmployeeT;
  data: CoobDataI[];
  empSkillsList: SkillT[];
  status: Status;
}

export type FetchEmpDashPropsT = {
  request?: RequestT;
  comment?: CommentT;
};

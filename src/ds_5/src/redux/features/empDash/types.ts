import { CommentT, CoobDataI, RequestT, Status } from '../../mainTypes';

export interface EmpDashState {
  employee: string;
  data: CoobDataI[];
  empSkillsList: SkillT[];
  status: Status;
}

export type FetchEmpDashPropsT = {
  request?: RequestT;
  comment?: CommentT;
};

export type SkillT = {
  skill: string;
  curSkills: string[];
  nextSkills: string[];
};

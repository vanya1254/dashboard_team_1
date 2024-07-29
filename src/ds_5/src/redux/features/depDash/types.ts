import { AllFiltersT, CoobDataI, RequestT, Status } from '../../mainTypes';

export interface DepDashState {
  data: CoobDataI[][];
  depTagCloud: DepTagCloudT[];
  depSimpleArea: DepSimpleAreaT[];
  depStackedMixedBar: DepStackedMixedBar[];
  status: Status;
}

export type FetchDepDashPropsT = {
  allFilters: AllFiltersT;
  request?: RequestT;
};

export type DepSimpleAreaT = { skill_name: string; avg_skill_grade_position: number };

export type DepStackedMixedBar = {
  name: string;
  prev_count_expert_department: number;
  prev_count_junior_department: number;
  prev_count_middle_department: number;
  prev_count_novice_department: number;
  prev_count_senior_department: number;
  cur_count_expert_department: number;
  cur_count_junior_department: number;
  cur_count_middle_department: number;
  cur_count_novice_department: number;
  cur_count_senior_department: number;
};

export type DepTagCloudT = {
  value: string;
  count: number;
};

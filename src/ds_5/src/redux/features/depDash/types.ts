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
  prev1: number;
  prev2: number;
  prev3: number;
  prev4: number;
  prev5: number;
  prev6: number;
  cur1: number;
  cur2: number;
  cur3: number;
  cur4: number;
  cur5: number;
  cur6: number;
};

export type DepTagCloudT = {
  value: string;
  count: number;
};

import { AllFiltersT, CoobDataI, RequestT, Status } from '../../mainTypes';

export interface DepDashState {
  data: CoobDataI[][];
  depSimpleArea: DepSimpleAreaT[];
  depBar: DepBarT[];
  status: Status;
}

export type FetchDepDashPropsT = {
  allFilters: AllFiltersT;
  request?: RequestT;
};

export type DepSimpleAreaT = { skill_name: string; avg_skill_grade_position: number };

export type DepBarT = { skill: string; 2022: number; 2023: number };

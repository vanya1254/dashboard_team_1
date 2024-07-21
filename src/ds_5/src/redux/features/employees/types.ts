import { AllFiltersT, CommentT, CoobDataI, MeasuresT, RequestT, Status } from '../../mainTypes';

export interface EmployeesState {
  employees: CoobDataI[];
  status: Status;
}

export type FetchEmployeesPropsT = {
  // koobId: KoobIdT;
  // dimensions?: DimensionsT;
  measures?: MeasuresT;
  allFilters: AllFiltersT;
  request?: RequestT;
  comment?: CommentT;
};

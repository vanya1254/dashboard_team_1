import { AllFiltersT, CommentT, CoobDataI, EmployeeT, MeasuresT, RequestT, Status } from '../../mainTypes';

export interface EmployeesState {
  employees: EmployeeT[];
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

import { CommentT, CoobDataI, RequestT, Status } from '../../mainTypes';

export interface FiltersState {
  filters: CoobDataI[][];
  status: Status;
}

export type FetchFiltersPropsT = {
  koobId: string;
  // dimensions?: DimensionsT;
  //   measures?: MeasuresT;
  //   allFilters: AllFiltersT;
  request?: RequestT;
  comment?: CommentT;
};

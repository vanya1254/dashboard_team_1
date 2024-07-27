import { AllFiltersT, FilterT } from '../../mainTypes';

export interface FilterState extends AllFiltersT {
  position: FilterT;
  department: FilterT;
  fullname: FilterT;
  skill_type: FilterT;
}

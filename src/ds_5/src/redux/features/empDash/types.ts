import { AllFiltersT, CoobDataI, EmployeeT, RequestT, SkillT, Status } from '../../mainTypes';

export interface EmpDashState {
  employee: EmployeeT;
  data: CoobDataI[][][];
  empSkillsList: SkillT[];
  empRadar: EmpRadarT[];
  empCard: EmpCardT[];
  empStackedArea: EmpStackedAreaT[][];
  empBar: EmpBarT[];
  empKpi: EmpKpiT[];
  status: Status;
}

export type FetchEmpDashPropsT = {
  allFilters: AllFiltersT;
  request?: RequestT;
};

export type EmpCardT = { skill_type: string; value: string[] };

export type EmpRadarT = { skill_type: string; level: number; midDepLevel: number; midPosLevel: number };

export type EmpStackedAreaT = { name: string; level: number };

export type EmpBarT = { skill: string; 2022: number; 2023: number };

export type EmpKpiT = { improvement_percent: number; new_skills_current: number; new_skills_last: number };

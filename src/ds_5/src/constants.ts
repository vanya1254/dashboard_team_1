export const KOOB_ID = 'etl_db_1.team_1';
export const SCHEMA_NAME = 'ds_5';

export const DIMENSIONS = {
  employees: ['fullname', 'position', 'department', 'fact_empl_skills_employee_key'],
  filters: ['position', 'department']
};

export const MEASURES = {
  employees: [],
  filters: []
};

export const EMP_DASHES_REQUESTS = {
  empSkillsList: {
    dimensions: ['skill_type', 'skill_name', 'dim_skill_level_skill_level_key'],
    measures: [],
    filters: { skill_type: ['=', 1, 2, 5, 6, 7, 8, 9, 10] },
    comment: 'empSkillsList'
  },
  empRadar: {
    dimensions: ['skill_type', 'avg_skill_grade_employee', 'avg_skill_grade_position'],
    measures: [],
    filters: { skill_type: ['=', 1, 2, 5, 6, 7, 8, 9, 10] },
    comment: 'empRadar'
  },
  empCard: {
    dimensions: ['skill_type', 'skill_name', 'dim_skill_level_skill_level_key'],
    measures: [],
    filters: { skill_type: ['=', 11, 12, 1, 2, 4, 5, 6, 7, 9, 10] },
    comment: 'empCard'
  }
};

// empRadar: {
//   dimensions: ['skill_type', 'avg_skill_grade_position'],
//   measures: [],
//   filters: { skill_type: ['=', 1, 2, 5, 6, 7, 8, 9, 10], position: ['=', 'Старший аналитик'] },
//   comment: 'empRadar'
// },

// export const DEFAULT_FILTERS = {
//   empSkillsList: { skill_type: ['=', 1, 2, 5, 6, 7, 8, 9, 10] },
//   empCard: { skill_type: ['=', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
// };

export const SKILL_TYPES = {
  1: 'Базы данных',
  2: 'Инструменты',
  3: 'Опыт в отрасли',
  4: 'Опыт сотрудника в предметной области',
  5: 'Платформы',
  6: 'Среды разработки',
  7: 'Технологии',
  8: 'Типы систем',
  9: 'Фреймворки',
  10: 'Языки программировния',
  11: 'Иностранные языки',
  12: 'Образование'
};

export const SKILL_LEVEL = {
  0: '',
  1: 'Novice',
  2: 'Junior',
  3: 'Middle',
  4: 'Senior',
  5: 'Expert',
  6: 'Знаком',
  7: 'Знаком и могу применить',
  8: 'Знаком, могу применить и реализовать',
  9: '',
  10: '',
  11: '',
  12: '',
  13: 'A1 - elementary',
  14: 'A2 - pre-intermediate',
  15: 'B1 - intermediate',
  16: 'B2 - upper intermediate',
  17: 'C1 - advanced',
  18: 'C2 - proficiency'
};

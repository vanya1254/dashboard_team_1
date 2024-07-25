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
    dimensions: ['skill_type', 'skill_name', 'dim_skill_level_skill_level_key', 'next_grade_level'],
    measures: [],
    filters: { skill_type: ['=', 1, 2, 5, 6, 7, 8, 9, 10] },
    comment: 'empSkillsList'
  },
  empRadar: {
    dimensions: ['skill_type', 'avg_skill_grade_employee', 'avg_skill_grade_position'],
    measures: [],
    filters: { skill_type: ['=', 10, 1, 5, 2, 6, 8, 7, 9] },
    comment: 'empRadar'
  },
  empCard: {
    dimensions: ['skill_type', 'skill_name', 'dim_skill_level_skill_level_key'],
    measures: [],
    filters: { skill_type: ['=', 11, 12, 1, 2, 4, 5, 6, 7, 9, 10] },
    comment: 'empCard'
  },
  empStackedArea: {
    dimensions: ['dim_skills_skill_key', 'current_skill_level', 'skill_type'],
    measures: [],
    filters: { skill_type: ['=', 3, 4] },
    comment: 'empStackedArea'
  },
  empBar: {
    dimensions: ['skill_name', 'calendar_year', 'max_skill_grade_employee'],
    measures: [],
    filters: { skill_type: ['=', 1, 2, 5, 6, 7, 8, 9, 10], calendar_year: ['=', 2022, 2023] },
    comment: 'empStackedArea'
  }
};
// Морозов Владислав

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
  13: 'A1',
  14: 'A2',
  15: 'B1',
  16: 'B2',
  17: 'C1',
  18: 'C2'
};

export const SKILL_KEYS = {
  43: 'Торговля',
  44: 'Медицина',
  45: 'ТЭК',
  46: 'Связь',
  47: 'Транспорт',
  48: 'Промышленность',
  49: 'Финансы',
  50: 'Госсектор',
  51: 'Складская логистика',
  52: 'Транспорт',
  53: 'Поставки',
  54: 'E-commerce',
  55: 'Закупки',
  56: 'IT',
  57: 'PR',
  58: 'HR',
  59: 'Документооборот',
  60: 'Перевозки',
  61: 'Нефтегаз',
  62: 'Банки',
  63: 'Строительство'
};

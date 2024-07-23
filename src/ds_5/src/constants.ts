export const KOOB_ID = 'etl_db_1.team_1';
export const SCHEMA_NAME = 'ds_5';

export const DIMENSIONS = {
  employees: ['fullname', 'position', 'department', 'fact_empl_skills_employee_key'],
  filters: ['position', 'department'],
  empSkillsList: ['skill_type', 'skill_name', 'current_skill_level']
};

export const MEASURES = {
  employees: [],
  filters: []
};

export const DEFAULT_FILTERS = {
  empSkillsList: { skill_type: ['=', 1, 2, 5, 6, 7, 8, 9, 10] }
};

export const SKILL_TYPES = {
  1: 'Базы данных',
  2: 'Инструменты',
  5: 'Платформы',
  6: 'Среды разработки',
  7: 'Технологии',
  8: 'Типы систем',
  9: 'Фреймворки',
  10: 'Языки программировния'
};

export const SKILL_LEVEL = {
  0: '',
  1: 'Novice',
  2: 'Junior',
  3: 'Middle',
  4: 'Senior',
  5: 'Expert'
};

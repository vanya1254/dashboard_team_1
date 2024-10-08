import { Requests, RequestsFilters, RequestStructure } from './types/global';

// Переменные идентификаторов для KOOB
export const KOOB_ID_EMP = 'etl_db_1.team_1';
export const KOOB_ID_DEP = 'etl_db_1.team_1_2';
export const SCHEMA_NAME = 'ds_5';

// Типы навыков
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
  10: 'Языки программирования',
  11: 'Иностранные языки',
  12: 'Образование'
};

// Уровни навыков
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

// Ключи для навыков
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

// Пример объекта запроса для сотрудников
export const EMPLOYEES_REQUEST: RequestStructure = {
  dimensions: ['fullname', 'position', 'department', 'fact_empl_skills_employee_key', 'picture_url'],
  measures: [],
  filters: {},
  comment: 'employees',
  request: {}
};

// Пример объекта запросов для фильтров
export const FILTERS_REQUESTS: RequestsFilters = {
  position: {
    dimensions: ['position'],
    measures: [],
    filters: {},
    comment: 'position',
    request: {
      sort: ['position']
    }
  },
  department: {
    dimensions: ['department'],
    measures: [],
    filters: {},
    comment: 'department',
    request: {
      sort: ['department']
    }
  },
  skill_type: {
    dimensions: ['skill_type'],
    measures: [],
    filters: { skill_type: ['and', ['>', 0], ['<', 11]] },
    comment: 'skill_type',
    request: {
      sort: ['skill_type']
    }
  }
};

// Пример объекта запросов для сотрудников (Dashlets)
export const EMP_DASHES_REQUESTS: Requests = {
  empSkillsList: [
    {
      dimensions: ['skill_type', 'skill_name', 'next_grade_level', 'skill_popularity'],
      measures: [],
      filters: { skill_type: ['=', 1, 2, 5, 6, 7, 8, 9, 10] },
      comment: 'empSkillsList',
      request: {
        sort: ['skill_popularity']
      }
    }
  ],
  empRadar: [
    {
      dimensions: ['skill_type'],
      measures: ['avg(avg_skill_grade_department)'],
      filters: { skill_type: ['=', 10, 1, 5, 2, 6, 8, 7, 9], fullname: ['='], position: ['='] },
      comment: 'empRadarDepPos',
      request: {}
    },
    {
      dimensions: ['skill_type'],
      measures: ['avg(avg_skill_grade_position)'],
      filters: { skill_type: ['=', 10, 1, 5, 2, 6, 8, 7, 9], fullname: ['='], department: ['='] },
      comment: 'empRadarDepPos',
      request: {}
    },
    {
      dimensions: ['skill_type'],
      measures: ['avg(avg_skill_grade_employee)'],
      filters: { skill_type: ['=', 10, 1, 5, 2, 6, 8, 7, 9] },
      comment: 'empRadarEmployee',
      request: {}
    }
  ],
  empCard: [
    {
      dimensions: ['skill_type', 'skill_name', 'dim_skill_level_skill_level_key'],
      measures: [],
      filters: { skill_type: ['=', 11, 12, 1, 2, 4, 5, 6, 7, 9, 10] },
      comment: 'empCard',
      request: {}
    }
  ],
  empStackedArea: [
    {
      dimensions: [
        'dim_skills_skill_key', //TODO: remove
        'skill_type'
      ],
      measures: ['current_skill_level'],
      filters: { skill_type: ['=', 3, 4] },
      comment: 'empStackedArea',
      request: {}
    }
  ],
  empBar: [
    {
      dimensions: ['skill_name', 'calendar_year', 'max_skill_grade_employee'],
      measures: [],
      filters: { skill_type: ['=', 1, 2, 5, 6, 7, 8, 9, 10], calendar_year: ['=', 2022, 2023] },
      comment: 'empBar',
      request: {}
    }
  ],
  empKpi: [
    {
      dimensions: ['improvement_percent', 'new_skills_current', 'new_skills_last'],
      measures: [],
      filters: {},
      comment: 'empKpi',
      request: {}
    }
  ]
};

// Пример объекта запросов для департаментов (Dashlets)
export const DEP_DASHES_REQUESTS: Requests = {
  depTagCloud: [
    {
      dimensions: ['department'],
      measures: ['sum(total_grades)'],
      filters: { calendar_year: ['=', 2023] },
      comment: 'depTagCloud',
      request: {}
    }
  ],
  depSimpleArea: [
    {
      dimensions: ['skill_name'],
      measures: ['avg(pos_skill_level)'],
      filters: {},
      comment: 'depSimpleArea',
      request: {
        sort: ['-pos_skill_level']
      }
    }
  ],
  depStackedMixedBar: [
    {
      dimensions: ['dim_skills_skill_key', 'skill_name', 'calendar_year'],
      measures: [
        'sum(count_novice_department)',
        'sum(count_junior_department)',
        'sum(count_middle_department)',
        'sum(count_senior_department)',
        'sum(count_expert_department)'
      ],
      filters: {
        calendar_year: ['=', 2022, 2023]
      },
      comment: 'depStackedMixedBar',
      request: {
        sort: ['dim_skills_skill_key']
      }
    },
    {
      dimensions: ['dim_skills_skill_key', 'skill_name', 'calendar_year'],
      measures: [
        'sum(total_novice_department):count_novice_department',
        'sum(total_junior_department):count_junior_department',
        'sum(total_middle_department):count_middle_department',
        'sum(total_senior_department):count_senior_department',
        'sum(total_expert_department):count_expert_department'
      ],
      filters: {
        calendar_year: ['=', 2022, 2023]
      },
      comment: 'depStackedMixedBar',
      request: {
        sort: ['dim_skills_skill_key']
      }
    }
  ]
};

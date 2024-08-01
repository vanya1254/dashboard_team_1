import React from 'react';

export interface ChildrenI {
  children: React.ReactNode;
}

export interface CustomizedI {
  className?: string;
}

export interface CustomizedLayoutI extends ChildrenI {
  className?: string;
}

// Общий тип для одной структуры запроса
export interface RequestStructure {
  dimensions: string[];
  measures: string[];
  filters: Record<string, any>;
  comment: string;
  request: Record<string, any>;
}

// Тип для объектов запросов
export type Requests = {
  [key: string]: RequestStructure[];
};

// Тип для объектов запросов Filters
export type RequestsFilters = {
  [key: string]: RequestStructure;
};

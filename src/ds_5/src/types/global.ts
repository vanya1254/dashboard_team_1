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

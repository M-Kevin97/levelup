import { Category } from 'src/app/modules/shared/models/category/category';
export interface ISearchQuery {
  category: Category;
  query: string;
  wr: string;
};

export enum WhatResults {
  INSTRUCTOR = "inst",
  COURSES = "crs"
};

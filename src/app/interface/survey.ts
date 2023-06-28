export interface Survey {
  title: string;
  name: string;
  id: string;
  questions: SurveyQuestion[];
}

export interface SurveyQuestion {
  message: string;
  position: number;
  answers: string[];
  type: SurveyType;
}

export enum SurveyType {
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  INPUT = 'input'
}

export interface SurveyResult {
  [key: string]: number | string | undefined;
};


export interface Category {
  category_id: string;
  name: string;
  domain_id: string;
  position: number
}
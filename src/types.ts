export interface fetchData {
  items: JobCardProps[];
  found: number;
  pages: number;
  per_page: number;
  page: number;
}

export interface JobCardProps {
  id: string;
  name: string;
  salary_range: SalaryRange;
  experience: Experience;
  employment_form?: EmploymentForm;
  employer: Employer;
  work_format?: WorkFormatList;
  address: Address;
  alternate_url: string;
  description?: string;
}

export interface WorkFormat {
  id: 'REMOTE' | 'HYBRID' | 'ON_SITE' | string;
  name: 'Удалённо' | 'Гибрид' | 'Офис' | string;
}

export type WorkFormatList = WorkFormat[];

export interface Address {
  city: string;
}

export interface SalaryRange {
  currency: string;
  from: number;
  to: number;
  gross: boolean;
}

export interface Experience {
  id: string;
  name: string;
}

export interface EmploymentForm {
  id: string;
  name: string;
}

export interface Employer {
  id: string;
  name: string;
  url: string;
  alternate_url: string;
  vacancies_url: string;
  trusted: boolean;
  accredited_it_employer: boolean;
}

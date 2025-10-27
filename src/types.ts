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
}

export interface WorkFormat {
  id: string;
  name: string;
}
export type WorkFormatList = WorkFormat[];

export interface Address {
  city: string;
}

export interface SalaryRange {
  currency: string;
  from: number;
  gross: boolean;
  to: number;
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
  accredited_it_employer: boolean;
  alternate_url: string;
  id: string;
  name: string;
  trusted: boolean;
  url: string;
  vacancies_url: string;
}

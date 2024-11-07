export enum Job_type {
  Full_time,
  Part_time,
  Intern,
  Contract,
  Freelancer
}

export interface JobEntity {
  id: number
  job_name: string
  location: string
  time_open: string
  time_close: string
  job_type: Job_type
  salary: string
  job_description: string
  number_of_recruitment: number
  slug : string
  created_at: Date
}
import { Job_type } from "../entities/Job"

export interface UpdateJob {
  job_name: string
  location: string
  time_open: string
  time_close: string
  job_type: Job_type
  salary: string
  job_description: string
  number_of_recruitment: number
}
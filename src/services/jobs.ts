import api from "../config/api";
import { UpdateJob } from "../dto/job.dto";

export function getAllJobs({ page = 1, pageSize = 10 } : { page?: number, pageSize?: number }) {
  return api.get(`/job?page=${page}&pageSize=${pageSize}`)
}

export function createJob(data: UpdateJob) {
  return api.post('job', data)
}

export function getJob(id: number) {
  return api.get(`/job/${id}`)
}

export function updateJob(id: number, data: UpdateJob) {
  return api.put(`/job/${id}`, data)
}

export function deleteJob(id: number) {
  return api.delete(`/job/${id}`)
} 


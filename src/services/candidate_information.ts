import api from "../config/api";

export function getAllCandidate({ page = 1, pageSize = 10 } : { page?: number, pageSize?: number }) {
  return api.get(`/apply?page=${page}&pageSize=${pageSize}`)
}

export function getCandidate(id: number) {
  return api.get(`/apply/${id}`)
}

export function deleteCandidate(id: number) {
  return api.delete(`/apply/${id}`)
} 


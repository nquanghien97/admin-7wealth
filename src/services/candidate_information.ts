import api from "../config/api";

export function getAllCandidate({ page = 1, pageSize = 10, full_name, phone_number } : { page?: number, pageSize?: number, full_name?: string, phone_number?: string }) {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  if (full_name) params.append('full_name', full_name.toString());
  if (phone_number) params.append('phone_number', phone_number.toString());
  return api.get(`/apply?${params.toString()}`)
}

export function getCandidate(id: number) {
  return api.get(`/apply/${id}`)
}

export function deleteCandidate(id: number) {
  return api.delete(`/apply/${id}`)
} 


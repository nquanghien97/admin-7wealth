import api from "../config/api";

export function getAllProducts({ page = 1, pageSize = 10 } : { page?: number, pageSize?: number }) {
  return api.get(`/products?page=${page}&pageSize=${pageSize}`)
}

export function createProducts(data: FormData) {
  return api.post('products', data)
}

export function getProducts(id: number) {
  return api.get(`/products/${id}`)
}

export function updateProducts(id: number, data: FormData) {
  return api.put(`/products/${id}`, data)
}

export function deleteProducts(id: number) {
  return api.delete(`/products/${id}`)
} 


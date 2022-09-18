import http from './http.js'

export const fetchApi = (path) => {
  http.get(path)
}

const baseURL = {
  //location
  development: 'http://localhost:4000/api/',
  production: 'http://111.229.200.218/prod/'
}[import.meta.env.MODE]

//基础通信服务
const wsBaseUrl = {
  development: 'ws://localhost:3001',
  production: 'ws://111.229.200.218:3001'
}[import.meta.env.MODE]

export { baseURL, wsBaseUrl }

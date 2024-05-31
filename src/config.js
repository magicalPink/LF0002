
const baseURL = {
  //location
  development: 'http://localhost:4000/api/',
  production: 'http://meihl.online/prod/'
}[import.meta.env.MODE]

//基础通信服务
const wsBaseUrl = {
  development: 'ws://localhost:3001',
  production: 'ws://meihl.online:3001'
}[import.meta.env.MODE]

export { baseURL, wsBaseUrl }

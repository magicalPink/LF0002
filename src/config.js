const baseURL = {
  //location
  development: 'http://127.0.0.1:4000/api/',
  production: 'http://124.222.235.110/prod/'
}[import.meta.env.MODE]

const wsUrl = {
  development: 'ws://127.0.0.1:3001',
  production: 'ws://124.222.235.110:3001'
}[import.meta.env.MODE]

export { baseURL, wsUrl }

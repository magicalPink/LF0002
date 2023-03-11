const baseURL = {
  development: 'api/',
  production: 'http://124.222.235.110:3000'
}[import.meta.env.MODE]

export default baseURL

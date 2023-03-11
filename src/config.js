const baseURL = {
  development: 'api/',
  production: 'prod/'
}[import.meta.env.MODE]

export default baseURL

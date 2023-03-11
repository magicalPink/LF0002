const baseURL = {
  development: '',
  production: '124.222.235.110:3000'
}[import.meta.env.MODE]

export default baseURL

import { NavigateFunction, } from 'react-router-dom'

export const validateAuth = async (navigate: NavigateFunction, path?: string) => {
  const isLogged = sessionStorage.getItem('isLogged')

  if (isLogged) navigate('/home')
  else if (path !== undefined) navigate(path)
  else navigate('/login')
}
import { NavigateFunction, } from 'react-router-dom'

export const validateAuth = async (navigate: NavigateFunction) => {
  const isLogged = sessionStorage.getItem('isLogged')

  if (isLogged) navigate('/home')
}
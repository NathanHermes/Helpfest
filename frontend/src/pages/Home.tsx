import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLogged = localStorage.getItem('isLogged')

    if (isLogged === null) navigate('/loading')
  })

  return (
    <main className='bg-violet-500'>
      <h1>Bem Vindo(a) ao HelpFest ...</h1>
      <p>Estamos em desenvolvimento, agradeçemos sua visita</p>
      <p>Volte novamente mais tarde.</p>
    </main>
  )
}
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { validateAuth } from '@/utils/validate-auth'

export const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    validateAuth(navigate, '/login')
  }, [])

  return (
    <main className='w-full h-screen flex flex-col items-center justify-center text-purple-600'>
      <h1 className='text-3xl'>Bem Vindo(a) ao <strong>HELPFEST</strong> ...</h1>
      <p className='text-zinc-500' > Estamos em desenvolvimento, agradeçemos sua visita</p>
      <p className='text-zinc-500'>Volte novamente mais tarde.</p>
    </main >
  )
}
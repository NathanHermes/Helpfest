import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Loading = () => {
  const navigate = useNavigate()

  useEffect(() => {
    async function validate () {
      const isLogged = localStorage.getItem('isLogged')

      await new Promise(
        resolve => setTimeout(resolve, 1000)
      )

      if (isLogged === null) navigate('/login')
      else navigate('/home')
    }

    validate()
  })

  return (
    <main className='w-full h-screen flex items-center justify-center bg-purple-600'>
      <h1 className='text-3xl font-bold'>Loading ...</h1>
    </main>
  )
}
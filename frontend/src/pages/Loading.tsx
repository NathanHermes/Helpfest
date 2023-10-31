import { validateAuth } from '@/utils/validate-auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Loading = () => {
  const navigate = useNavigate()

  useEffect(() => {
    validateAuth(navigate)
  }, [])

  return (
    <main className='w-full h-screen flex items-center justify-center bg-purple-600'>
      <h1 className='text-3xl font-bold'>Loading ...</h1>
    </main>
  )
}
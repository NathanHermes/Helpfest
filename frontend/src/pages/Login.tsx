import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { login } from '@/api/company'

const loginSchema = z.object({
  email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
  secret: z.string().min(1, 'Campo obrigatório')
})

type LoginFormData = z.infer<typeof loginSchema>

export const Login = () => {
  const navigate = useNavigate()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const handleLogin = (data: LoginFormData) => {
    login(data)
      .then(() => {
        localStorage.setItem('isLogged', 'true')
        navigate('/home')
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }

  return (
    <main className="flex flex-col items-center justify-center rounded-md p-4 gap-8">
      <h1 className="text-4xl font-black">HELPFEST</h1>

      <section className='flex flex-col items-center justify-center'>
        <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col items-center justify-center gap-4'>
          <fieldset className='flex flex-col gap-1'>
            <span className='text-sm font-medium'>Email*</span>
            <input
              id='email'
              type="email"
              {...register('email')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600' required />

            {errors.email && (
              <span className="font-medium text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </fieldset>

          <fieldset className='flex flex-col gap-1'>
            <span className='text-sm font-medium'>Senha*</span>
            <input
              id="secret"
              type="password"
              {...register('secret')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600'
              required />

            {errors.secret && (
              <span className="font-medium text-sm text-red-500">
                {errors.secret.message}
              </span>
            )}
          </fieldset>

          <button className='w-full h-9 rounded-md bg-purple-600'>Login</button>
        </form>
      </section>
    </main>
  )
}

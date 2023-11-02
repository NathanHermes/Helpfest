import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { login } from '@/api/company'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect, useState } from 'react'
import { validateAuth } from '@/utils/validate-auth'

const loginSchema = z.object({
  email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
  secret: z.string().min(1, 'Campo obrigatório')
})

type LoginFormData = z.infer<typeof loginSchema>

export const Login = () => {
  const navigate = useNavigate()
  const [secretInputType, setSecretInputType] = useState('password')
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  useEffect(() => {
    validateAuth(navigate, '/login')
  }, [])

  const handleCheckbox = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const ariaChecked = event.currentTarget.ariaChecked

    if (ariaChecked === 'false') setSecretInputType('text')
    else setSecretInputType('password')
  }

  const handleLogin = (data: LoginFormData) => {
    login(data)
      .then((response) => {
        sessionStorage.setItem('isLogged', 'true')
        sessionStorage.setItem('token', response.data.token)
        navigate('/home')
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }

  return (
    <main className="flex flex-col items-center justify-center rounded-md p-4 gap-8">
      <h1 className="text-4xl font-black">HELPFEST</h1>

      <section className='flex flex-col items-center justify-center gap-8'>
        <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col items-center justify-center gap-4'>
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor='email' className='text-sm font-medium'>Email*</label>
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
            <label htmlFor='secret' className='text-sm font-medium'>Senha*</label>
            <input
              id="secret"
              type={secretInputType}
              {...register('secret')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600'
              required />

            {errors.secret && (
              <span className="font-medium text-sm text-red-500">
                {errors.secret.message}
              </span>
            )}
          </fieldset>

          <fieldset className='w-full flex items-center gap-1'>
            <Checkbox id='showSecret' onClick={handleCheckbox} />
            <label htmlFor='showSecret'>Mostrar senha</label>
          </fieldset>

          <button className='w-full h-9 rounded-md bg-violet-600'>Login</button>
        </form>

        <div className='flex items-center justify-center gap-2 text-sm'>
          <span>Não possui uma conta?</span>
          <Link to={'/register'} className='underline underline-offset-2 font-bold text-violet-600'>Crie sua conta</Link>
        </div>
      </section>
    </main>
  )
}

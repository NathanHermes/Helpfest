import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
  secret: z.string().min(1, 'Campo obrigatório')
})

type LoginFormData = z.infer<typeof loginSchema>

export const Login = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const handleLogin = (data: LoginFormData) => {

  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-black">HELPFEST</h1>

      <section>
        <h2>Login</h2>

        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset>
            <span>Email*</span>
            <input id="email" type="email" {...register('email')} required />

            {errors.email && (
              <span className="font-medium text-base text-red-500">
                {errors.email.message}
              </span>
            )}
          </fieldset>

          <fieldset>
            <span>Senha*</span>
            <input id="secret" type="password" {...register('secret')} required />

            {errors.secret && (
              <span className="font-medium text-base text-red-500">
                {errors.secret.message}
              </span>
            )}
          </fieldset>
        </form>
      </section>
    </main>
  )
}

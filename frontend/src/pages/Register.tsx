import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { z } from 'zod'

import { validateAuth } from '@/utils/validate-auth'
import { CompanyModel, saveCompany } from '@/api/company'

const registerSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório').min(3, 'Nome inválido'),
  email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
  cnpj: z.string().min(1, 'Campo obrigatório').refine(cnpj => {
    const _cnpj = cnpj.replace(/[^\d]+/g, '')
    if (_cnpj === '') return false
    if (_cnpj.length < 14) return false

    return true
  }, 'CNPJ inválido'),
  phone: z.string().min(1, 'Campo obrigatório').min(12, 'Telefone inválido'),
  address: z.string().min(1, 'Campo obrigatório'),
  number: z.string(),
  city: z.string().min(1, 'Campo obrigatório'),
  uf: z.string().min(1, 'Campo obrigatório').min(2, 'UF inválida').max(2, 'UF inválida'),
  complement: z.string(),
  secret: z.string().min(1, 'Campo obrigatório'),
  replaySecret: z.string().min(1, 'Campo obrigatório')
})

type RegisterFormData = z.infer<typeof registerSchema>

export const Register = () => {
  const navigate = useNavigate()

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  useEffect(() => {
    validateAuth(navigate, '/register')
  }, [])

  const handleRegister = (data: RegisterFormData) => {
    if (data.secret !== data.replaySecret) alert('Senha inválidas')

    const company: CompanyModel = {
      name: data.name,
      email: data.email,
      CNPJ: data.cnpj,
      phone: data.phone,
      address: data.address,
      number: data.number,
      city: data.city,
      uf: data.uf,
      complement: data.complement,
      secret: data.secret
    }

    saveCompany(company)
      .then(() => {
        alert('Empresa cadastrada com sucesso.')
        navigate('/login')
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }

  return (
    <main className='flex flex-col items-center justify-center rounded-md p-4 gap-8'>
      <h1 className='text-4xl font-black'>HELPFEST</h1>

      <section className='flex flex-col items-center justify-center gap-8'>
        <form onSubmit={handleSubmit(handleRegister)} className='flex flex-col items-center justify-center gap-4'>
          <div className="flex items-center justify-center gap-4">
            <fieldset className='flex flex-col gap-1'>
              <label htmlFor='name' className='text-sm font-medium'>Nome*</label>
              <input
                id='name'
                type='text'
                {...register('name')}
                className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600'
              />

              {errors.name && (
                <span className='font-medium text-sm text-red-500'>
                  {errors.name.message}
                </span>
              )}
            </fieldset>

            <fieldset className='flex flex-col gap-1'>
              <label htmlFor='email' className='text-sm font-medium'>Email*</label>
              <input
                id='email'
                type='email'
                {...register('email')}
                className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600'
              />

              {errors.email && (
                <span className='font-medium text-sm text-red-500'>
                  {errors.email.message}
                </span>
              )}
            </fieldset>
          </div>

          <div className="flex items-center justify-center gap-4">
            <fieldset className='flex flex-col gap-1'>
              <label htmlFor='cnpj' className='text-sm font-medium'>CNPJ*</label>
              <input
                id='cnpj'
                type='text'
                {...register('cnpj')}
                className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600'
              />

              {errors.cnpj && (
                <span className='font-medium text-sm text-red-500'>
                  {errors.cnpj.message}
                </span>
              )}
            </fieldset>

            <fieldset className='flex flex-col gap-1'>
              <label htmlFor='phone' className='text-sm font-medium'>Telefone*</label>
              <input
                id='phone'
                type='text'
                {...register('phone')}
                className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600'
              />

              {errors.phone && (
                <span className='font-medium text-sm text-red-500'>
                  {errors.phone.message}
                </span>
              )}
            </fieldset>
          </div>

          <div className="flex items-center justify-center gap-4">
            <fieldset className='flex flex-col gap-1'>
              <label htmlFor='address' className='text-sm font-medium'>Endereço*</label>
              <input
                id='address'
                type='text'
                {...register('address')}
                className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600'
              />

              {errors.address && (
                <span className='font-medium text-sm text-red-500'>
                  {errors.address.message}
                </span>
              )}
            </fieldset>

            <fieldset className='flex flex-col gap-1'>
              <label htmlFor='number' className='text-sm font-medium'>Número*</label>
              <input
                id='number'
                type='text'
                {...register('number')}
                className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600'
              />

              {errors.number && (
                <span className='font-medium text-sm text-red-500'>
                  {errors.number.message}
                </span>
              )}
            </fieldset>
          </div>

          <div className="flex items-center justify-center gap-4">
            <fieldset className='flex flex-col gap-1'>
              <label htmlFor='city' className='text-sm font-medium'>Cidade*</label>
              <input
                id='city'
                type='text'
                {...register('city')}
                className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600'
              />

              {errors.city && (
                <span className='font-medium text-sm text-red-500'>
                  {errors.city.message}
                </span>
              )}
            </fieldset>

            <fieldset className='flex flex-col gap-1'>
              <label htmlFor='uf' className='text-sm font-medium'>UF*</label>
              <input
                id='uf'
                type='text'
                {...register('uf')}
                className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600'
              />

              {errors.uf && (
                <span className='font-medium text-sm text-red-500'>
                  {errors.uf.message}
                </span>
              )}
            </fieldset>
          </div>

          <fieldset className='flex w-full flex-col gap-1'>
            <label htmlFor='complement' className='text-sm font-medium'>Complemento*</label>
            <input
              id='complement'
              type='text'
              {...register('complement')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600'
            />

            {errors.complement && (
              <span className='font-medium text-sm text-red-500'>
                {errors.complement.message}
              </span>
            )}
          </fieldset>

          <div className="flex items-center justify-center gap-4">
            <fieldset className='flex flex-col gap-1'>
              <label htmlFor='secret' className='text-sm font-medium'>Senha*</label>
              <input
                id='secret'
                type='password'
                {...register('secret')}
                className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600'
              />

              {errors.secret && (
                <span className='font-medium text-sm text-red-500'>
                  {errors.secret.message}
                </span>
              )}
            </fieldset>

            <fieldset className='flex flex-col gap-1'>
              <label htmlFor='replaySecret' className='text-sm font-medium'>Confirmar Senha*</label>
              <input
                id='replaySecret'
                type='password'
                {...register('replaySecret')}
                className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-purple-600'
              />

              {errors.replaySecret && (
                <span className='font-medium text-sm text-red-500'>
                  {errors.replaySecret.message}
                </span>
              )}
            </fieldset>
          </div>

          <button className='w-full h-9 rounded-md bg-violet-600'>Registrar</button>
        </form>

        <div className='flex items-center justify-center gap-2 text-sm'>
          <span>Já possui uma conta?</span> <Link to={'/login'} className='underline underline-offset-2 font-bold text-violet-600'>Acesse sua conta</Link>
        </div>
      </section>
    </main>
  )
}

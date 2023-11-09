import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { CompanyModel, updateCompany } from '@/api/company'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const registerSchema = z.object({
  uuid: z.string().uuid('Campo inválido'),
  name: z.string().min(1, 'Campo obrigatório').min(3, 'Nome inválido'),
  email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
  cnpj: z.string().min(1, 'Campo obrigatório').refine(cnpj => {
    const _cnpj = cnpj.replace(/[^\d]+/g, '')
    if (_cnpj === '') return false
    if (_cnpj.length < 14) return false

    return true
  }, 'CNPJ inválido'),
  phone: z.string().min(1, 'Campo obrigatório').min(10, 'Telefone inválido'),
  address: z.string().min(1, 'Campo obrigatório'),
  number: z.string(),
  city: z.string().min(1, 'Campo obrigatório'),
  uf: z.string().min(1, 'Campo obrigatório').min(2, 'UF inválida').max(2, 'UF inválida'),
  complement: z.string()
})

type RegisterFormData = z.infer<typeof registerSchema>

export const UserForm = () => {
  const [isShow, setIsShow] = useState(true)
  const [company, setCompany] = useState<CompanyModel>()
  const navigate = useNavigate()
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  useEffect(() => {
    const _company = JSON.parse(sessionStorage.getItem('company')!)

    if (_company !== undefined) {
      setCompany(_company)
      setValue('uuid', _company.uuid!)
      setValue('name', _company.name)
      setValue('email', _company.email)
      setValue('cnpj', _company.CNPJ)
      setValue('phone', _company.phone)
      setValue('address', _company.address)
      setValue('number', _company.number || '')
      setValue('city', _company.city)
      setValue('uf', _company.uf)
      setValue('complement', _company.complement || '')
    }
  }, [])

  const handleUpdate = (data: RegisterFormData) => {
    if (!isShow) {
      const token = sessionStorage.getItem('token')
      const _company: CompanyModel = {
        uuid: company!.uuid,
        name: data.name,
        email: data.email,
        CNPJ: data.cnpj,
        phone: data.phone,
        address: data.address,
        number: data.number,
        city: data.city,
        uf: data.uf,
        complement: data.complement,
        secret: company!.secret
      }

      updateCompany(token!, _company)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }

    setIsShow(!isShow)
  }

  const logout = () => {
    sessionStorage.clear()
    navigate('/')
  }

  return (
    <main className='flex items-center justify-center'>
      <form onSubmit={handleSubmit(handleUpdate)} className='flex flex-col items-center justify-center gap-4'>
        <fieldset className='w-full flex flex-col gap-1'>
          <label htmlFor='uuid' className='text-sm font-medium'>UUID</label>
          <input
            id='uuid'
            type='text'
            {...register('uuid')}
            className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm disabled:text-muted-foreground focus:outline focus:outline-zinc-600'
            disabled
          />

          {errors.name && (
            <span className='font-medium text-sm text-red-500'>
              {errors.name.message}
            </span>
          )}
        </fieldset>
        <div className="flex items-center justify-center gap-4">
          <fieldset className='flex flex-col gap-1'>
            <label htmlFor='name' className='text-sm font-medium'>Nome*</label>
            <input
              id='name'
              type='text'
              {...register('name')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-zinc-600'
              disabled={isShow}
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
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-zinc-600'
              disabled={isShow}
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
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-zinc-600'
              disabled={isShow}
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
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-zinc-600'
              disabled={isShow}
            />

            {errors.phone && (
              <span className='font-medium text-sm text-red-500'>
                {errors.phone.message}
              </span>
            )}
          </fieldset>
        </div>

        <div className="flex items-center justify-center gap-4">
          <fieldset className='w-full flex flex-col gap-1'>
            <label htmlFor='address' className='text-sm font-medium'>Endereço*</label>
            <input
              id='address'
              type='text'
              {...register('address')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-zinc-600'
              disabled={isShow}
            />

            {errors.address && (
              <span className='font-medium text-sm text-red-500'>
                {errors.address.message}
              </span>
            )}
          </fieldset>

          <fieldset className='w-1/2 flex flex-col gap-1'>
            <label htmlFor='number' className='text-sm font-medium'>Número*</label>
            <input
              id='number'
              type='text'
              {...register('number')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-zinc-600'
              disabled={isShow}
            />

            {errors.number && (
              <span className='font-medium text-sm text-red-500'>
                {errors.number.message}
              </span>
            )}
          </fieldset>
        </div>

        <div className="flex items-center justify-center gap-4">
          <fieldset className='w-full flex flex-col gap-1'>
            <label htmlFor='city' className='text-sm font-medium'>Cidade*</label>
            <input
              id='city'
              type='text'
              {...register('city')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-zinc-600'
              disabled={isShow}
            />

            {errors.city && (
              <span className='font-medium text-sm text-red-500'>
                {errors.city.message}
              </span>
            )}
          </fieldset>

          <fieldset className='w-1/2 flex flex-col gap-1'>
            <label htmlFor='uf' className='text-sm font-medium'>UF*</label>
            <input
              id='uf'
              type='text'
              {...register('uf')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-zinc-600'
              disabled={isShow}
            />

            {errors.uf && (
              <span className='font-medium text-sm text-red-500'>
                {errors.uf.message}
              </span>
            )}
          </fieldset>
        </div>

        <fieldset className='flex w-full flex-col gap-1'>
          <label htmlFor='complement' className='text-sm font-medium'>Complemento</label>
          <input
            id='complement'
            type='text'
            {...register('complement')}
            className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline focus:outline-zinc-600'
            disabled={isShow}
          />

          {errors.complement && (
            <span className='font-medium text-sm text-red-500'>
              {errors.complement.message}
            </span>
          )}
        </fieldset>

        <div className='w-full flex items-center justify-center gap-4'>
          {isShow ? (
            <>
              <button className='w-full h-9 rounded-md text-sm bg-zinc-950 text-zinc-50'>Editar</button>
              <button type='button' className='w-full h-9 border border-zinc-950 rounded-md text-sm text-zinc-950' onClick={logout}>Sair</button>
            </>

          ) : (
            <button type='submit' className='w-full h-9 rounded-md text-sm bg-zinc-950 text-zinc-50'>Salvar</button>
          )}
        </div>
      </form>
    </main>
  )
}

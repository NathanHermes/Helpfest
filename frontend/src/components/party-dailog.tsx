import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

import { CompanyModel } from '@/api/company'
import { PartyModel } from '@/api/party'

interface PartyDailogArgs {
  party: PartyModel,
  update: (token: string, party: PartyModel) => void
}

const partySchema = z.object({
  uuid: z.string().uuid('Campo inválido'),
  name: z.string().min(1, 'Campo inválido'),
  partyDate: z.string().min(1, 'Campo inválido'),
  partyTime: z.string().min(1, 'Campo inválido'),
  celebrities: z.string(),
  observations: z.string()
})

type PartyFormData = z.infer<typeof partySchema>

export const PartyDailog = ({ party, update }: PartyDailogArgs) => {
  const [isShow, setIsShow] = useState(true)

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue
  } = useForm<PartyFormData>({
    resolver: zodResolver(partySchema)
  })

  useEffect(() => {
    setValue('uuid', party.uuid!)
    setValue('name', party.name)
    setValue('partyDate', party.partyDate)
    setValue('partyTime', party.partyTime)
    setValue('celebrities', party.celebrities || '')
    setValue('observations', party.observations || '')
  }, [])

  const handleUpdate = (data: PartyFormData) => {
    if (!isShow) {
      const token = sessionStorage.getItem('token')
      const company: CompanyModel = JSON.parse(sessionStorage.getItem('company')!)

      const party: PartyModel = {
        uuid: data.uuid,
        name: data.name,
        partyDate: data.partyDate,
        partyTime: data.partyTime,
        celebrities: data.celebrities,
        observations: data.observations,
        uuidCompany: company.uuid!
      }

      update(token!, party)
    }

    setIsShow(!isShow)
  }

  return (
    <Dialog>
      <DialogTrigger className='max-w-[240px] max-h-[240px] flex flex-col items-center justify-center rounded-md text-zinc-50 bg-zinc-950'>
        <h2 className='text-2xl font-medium'>{party.name}</h2>

        <div className='flex gap-2 text-sm text-zinc-500'>
          <p>{party.partyDate}</p>
          <p>|</p>
          <p>{party.partyTime}</p>
        </div>
      </DialogTrigger>

      <DialogContent className='max-w-xs'>
        <DialogHeader>
          <DialogTitle>Evento</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleUpdate)} className='flex flex-col items-center justify-center gap-4'>
          <fieldset className='w-full flex flex-col gap-1'>
            <label htmlFor='uuid' className='text-sm font-medium'>UUID</label>
            <input
              id='uuid'
              type='text'
              {...register('uuid')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground disabled:text-muted-foreground'
              disabled
            />

            {errors.uuid && (
              <span className='font-medium text-sm text-red-500'>
                {errors.uuid.message}
              </span>
            )}
          </fieldset>

          <fieldset className='w-full flex flex-col gap-1'>
            <label htmlFor='email' className='text-sm font-medium'>Nome*</label>
            <input
              id='nome'
              type='text'
              {...register('name')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground disabled:text-muted-foreground'
              disabled={isShow}
            />

            {errors.name && (
              <span className='font-medium text-sm text-red-500'>
                {errors.name.message}
              </span>
            )}
          </fieldset>

          <fieldset className='w-full flex flex-col gap-1'>
            <label htmlFor='partyDate' className='text-sm font-medium'>Data*</label>
            <input
              id='partyDate'
              type='text'
              {...register('partyDate')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground disabled:text-muted-foreground'
              disabled={isShow}
            />

            {errors.partyDate && (
              <span className='font-medium text-sm text-red-500'>
                {errors.partyDate.message}
              </span>
            )}
          </fieldset>

          <fieldset className='w-full flex flex-col gap-1'>
            <label htmlFor='partyTime' className='text-sm font-medium'>Horário*</label>
            <input
              id='partyTime'
              type='text'
              {...register('partyTime')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground disabled:text-muted-foreground'
              disabled={isShow}
            />

            {errors.partyTime && (
              <span className='font-medium text-sm text-red-500'>
                {errors.partyTime.message}
              </span>
            )}
          </fieldset>

          <fieldset className='w-full flex flex-col gap-1'>
            <label htmlFor='celebrities' className='text-sm font-medium'>Celebridades</label>
            <textarea
              id='celebrities'
              {...register('celebrities')}
              className='w-full flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground disabled:text-muted-foreground'
              disabled={isShow}
            />

            {errors.celebrities && (
              <span className='font-medium text-sm text-red-500'>
                {errors.celebrities.message}
              </span>
            )}
          </fieldset>

          <fieldset className='w-full flex flex-col gap-1'>
            <label htmlFor='observations' className='text-sm font-medium'>Observações</label>
            <textarea
              id='observations'
              {...register('observations')}
              className='w-full flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground disabled:text-muted-foreground'
              disabled={isShow}
            />

            {errors.observations && (
              <span className='font-medium text-sm text-red-500'>
                {errors.observations.message}
              </span>
            )}
          </fieldset>

          <div className='w-full flex items-center justify-center gap-4'>
            {isShow ? (
              <>
                <button className='w-full h-9 rounded-md text-sm bg-zinc-950 text-zinc-50'>Editar</button>
                <button className='w-full h-9 border border-zinc-950 rounded-md text-sm text-zinc-950'>Apagar</button>
              </>

            ) : (
              <button className='w-full h-9 rounded-md text-sm bg-zinc-950 text-zinc-50'>Salvar</button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog >
  )
}
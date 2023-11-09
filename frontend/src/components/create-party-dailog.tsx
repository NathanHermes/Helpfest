import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

import { CompanyModel } from '@/api/company'
import { PartyModel } from '@/api/party'

interface PartyDailogArgs {
  action: (token: string, party: PartyModel) => void
}

const partySchema = z.object({
  name: z.string().min(1, 'Campo inválido'),
  partyDate: z.string().min(1, 'Campo inválido'),
  partyTime: z.string().min(1, 'Campo inválido'),
  celebrities: z.string(),
  observations: z.string()
})

type PartyFormData = z.infer<typeof partySchema>

export const CreatePartyDailog = ({ action }: PartyDailogArgs) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue
  } = useForm<PartyFormData>({
    resolver: zodResolver(partySchema)
  })

  const handleCreate = (data: PartyFormData) => {
    const token = sessionStorage.getItem('token')
    const company: CompanyModel = JSON.parse(sessionStorage.getItem('company')!)

    const party: PartyModel = {
      name: data.name,
      partyDate: data.partyDate,
      partyTime: data.partyTime,
      celebrities: data.celebrities,
      observations: data.observations,
      uuidCompany: company.uuid!
    }

    action(token!, party)

    setValue('name', '')
    setValue('partyDate', '')
    setValue('partyTime', '')
    setValue('celebrities', '')
    setValue('observations', '')
  }

  return (
    <Dialog>
      <DialogTrigger className='flex items-center justify-center px-4 py-2 rounded-md text-zinc-50 bg-zinc-900'>
        + Novo Evento
      </DialogTrigger>

      <DialogContent className='max-w-xs'>
        <DialogHeader>
          <DialogTitle>Evento</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreate)} className='flex flex-col items-center justify-center gap-4'>
          <fieldset className='w-full flex flex-col gap-1'>
            <label htmlFor='email' className='text-sm font-medium'>Nome*</label>
            <input
              id='nome'
              type='text'
              {...register('name')}
              className='w-full h-9 flex border rounded-md bg-transparent px-3 py-1 text-sm placeholder:text-muted-foreground disabled:text-muted-foreground'
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
            />

            {errors.observations && (
              <span className='font-medium text-sm text-red-500'>
                {errors.observations.message}
              </span>
            )}
          </fieldset>

          <div className='w-full flex items-center justify-center gap-4'>
            <button className='w-full h-9 rounded-md text-sm bg-zinc-950 text-zinc-50'>Salvar</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
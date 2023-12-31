import { PartyModel, createParty, deleteParty, getAllParties, updateParty } from '@/api/party'
import { CreatePartyDailog } from '@/components/create-party-dailog'
import { PartyDailog } from '@/components/party-dailog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { UserForm } from '@/components/user-form'
import { validateAuth } from '@/utils/validate-auth'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()
  const [parties, setParties] = useState(Array<PartyModel>)

  useEffect(() => {
    validateAuth(navigate, '/login')
    loadParties()
  }, [])

  const loadParties = () => {
    const token = sessionStorage.getItem('token')

    getAllParties(token!)
      .then(({ data }) => {
        setParties(data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleCreateParty = (token: string, party: PartyModel) => {
    createParty(token, party)
      .then(() => {
        alert('Evento cadastrado')
        loadParties()
      })
      .catch((error) => {
        alert(error.response.data.message)
        loadParties()
      })
  }

  const handleUpdateParty = (token: string, party: PartyModel) => {
    updateParty(token!, party)
      .then(() => {
        alert('Evento atualizado')
        loadParties()
      })
      .catch((error) => {
        alert(error.response.data.message)
        loadParties()
      })
  }

  const handleDeleteParty = (token: string, uuid: string) => {
    deleteParty(token, uuid)
      .then(() => {
        loadParties()
        alert('Evento deletado')
      })
      .catch((error) => {
        alert(error.response.data.message)
        loadParties()
      })
  }

  return (
    <main className='w-full h-screen flex flex-col items-center gap-10'>
      <nav className='w-3/4 min-h-[8vh] flex items-center justify-between mt-4 p-4 rounded-md bg-zinc-950'>
        <h1 className='text-2xl font-medium text-zinc-50'>HELPFEST</h1>

        <div className='flex items-center justify-center gap-4'>
          <CreatePartyDailog
            action={handleCreateParty}
          />

          <Popover>
            <PopoverTrigger className='p-2 rounded-full bg-zinc-900 duration-500 hover:bg-zinc-800'>
              <User className='text-zinc-50' />
            </PopoverTrigger>
            <PopoverContent className='max-w-sm w-full flex items-center justify-center'>
              <UserForm />
            </PopoverContent>
          </Popover>
        </div>
      </nav>

      <div>
        <h1 className='text-3xl'>Bem Vindo(a) ao <strong>HELPFEST</strong> ...</h1>
        <p className='text-zinc-500' > Estamos em desenvolvimento, agradeçemos sua visita</p>
        <p className='text-zinc-500'>Volte novamente mais tarde.</p>
      </div>

      <section className='w-3/4 h-full grid grid-cols-5 gap-4'>
        {parties.map((party) =>
          <PartyDailog key={party.uuid} party={party} update={handleUpdateParty} deleteAction={handleDeleteParty} />
        )}
      </section>
    </main >
  )
}
import getCurrentUser from '@/lib/getCurrentUser'
import Client from './Client'

const Create = async () => {
  const currentUser = await getCurrentUser()

  return (
    <Client
      currentUser={currentUser}
    />
  )
}

export default Create
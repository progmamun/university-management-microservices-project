import { IUser } from './users.interface'
import { User } from './users.model'

export const createUser = async (user: IUser): Promise<IUser | null> => {
  const createUser = await User.create(user)

  if (!createUser) {
    throw new Error('Fail to create user')
  }
  return createUser
}

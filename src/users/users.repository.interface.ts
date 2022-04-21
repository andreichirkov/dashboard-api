import { User } from './user.entity'
import { UserModel } from '@prisma/client'

export interface IUsersRepository {
	//репозиторий должен создавать пользователя и находить
	//примерт тип из энтити, вернет тип модели юзера из призмы (модель представления из базы)
	create: (user: User) => Promise<UserModel>

	//если пользователя не найти лучше возвращать null , а не ошибки
	find: (email: string) => Promise<UserModel | null>
}

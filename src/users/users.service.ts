import { IUserService } from './users.service.interface'
import { UserRegisterDto } from './dto/user-register.dto'
import { UserLoginDto } from './dto/user-login.dto'
import { User } from './user.entity'
import { injectable } from 'inversify'

@injectable()
export class UsersService implements IUserService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		//Создание инстанса пользователя
		const newUser = new User(email, name)
		//Добавить ему захешированный пароль
		await newUser.setPassword(password)
		return null
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true
	}
}

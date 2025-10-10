import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator'

export class AuthenticateUserDto {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ type: 'string' })
	email: string

	@IsNotEmpty()
	@IsStrongPassword()
	@ApiProperty({ type: 'string' })
	password: string
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsStrongPassword,
} from 'class-validator'

export class RegisterClientDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({ type: 'string' })
	name: string

	@IsOptional()
	@IsString()
	@ApiPropertyOptional({ type: 'string' })
	phoneNumber?: string

	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({ type: 'string' })
	email: string

	@IsNotEmpty()
	@IsStrongPassword()
	@ApiProperty({ type: 'string' })
	password: string
}

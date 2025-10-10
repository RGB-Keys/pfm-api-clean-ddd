import { UserRole } from '@/api/domain/enums/user/role'
import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsJWT } from 'class-validator'

export class UserBaseEntity {
	@ApiProperty({
		type: 'string',
		format: 'uuid',
	})
	id: string

	@ApiProperty({
		type: 'string',
	})
	email: string

	@ApiProperty({
		type: 'string',
	})
	passwordHash: string

	@ApiProperty({
		enum: UserRole,
		enumName: 'UserRole',
	})
	role: UserRole

	@ApiProperty({
		type: 'string',
		nullable: true,
	})
	avatarUrl?: string | null

	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	createdAt: Date

	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	updatedAt: Date
}

export class AuthUser extends OmitType(UserBaseEntity, [
	'avatarUrl',
	'passwordHash',
	'createdAt',
	'updatedAt',
]) {}

export class AuthUserResponseEntity {
	@IsJWT()
	@ApiProperty({
		example: 'eyJhpXVCJ9.eyJzdWDIyfQ.SflKsw5c',
		type: 'string',
	})
	token: string

	@ApiProperty({ type: AuthUser })
	user: AuthUser
}

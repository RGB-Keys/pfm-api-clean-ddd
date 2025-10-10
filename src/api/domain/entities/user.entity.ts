import { validateProps } from '@/shared/core/utils/validateProps.utils'
import { validateString } from '@/shared/core/utils/validateString.utils'
import { AggregateRoot, UniqueEntityId } from '@shared'
import { UserRole } from '../enums/user/role'

export interface UserProps {
	email: User['email']
	passwordHash: User['passwordHash']
	role: User['role']
	avatarUrl?: User['avatarUrl']
	createdAt: User['createdAt']
	updatedAt?: User['updatedAt']
}

export class User extends AggregateRoot {
	public email: string
	public passwordHash: string
	public role: UserRole
	public avatarUrl?: string | null
	public createdAt: Date
	public updatedAt?: Date | null

	protected constructor(
		input: Omit<UserProps, 'createdAt'>,
		id?: UniqueEntityId,
	) {
		super(id)

		this.email = input.email
		this.passwordHash = input.passwordHash
		this.role = input.role ?? UserRole.CLIENT
		this.avatarUrl = input.avatarUrl
		this.createdAt = new Date()
		this.updatedAt = input.updatedAt
	}

	protected restore(input: UserProps, id?: UniqueEntityId): User {
		return new User(input, id)
	}

	protected updateUserProps(props: {
		email?: User['email']
		passwordHash?: User['passwordHash']
		avatarUrl?: User['avatarUrl']
	}) {
		const updates: Partial<User> = {}

		if (props.email && props.email !== this.email) {
			validateString(props.email, 'Email')
			updates.email = props.email
		}

		if (props.passwordHash && props.passwordHash !== this.passwordHash) {
			validateString(props.passwordHash, 'PasswordHash')
			updates.passwordHash = props.passwordHash
		}

		if (props.avatarUrl !== undefined && props.avatarUrl !== this.avatarUrl) {
			updates.avatarUrl = props.avatarUrl
		}

		if (Object.keys(updates).length > 0) {
			Object.assign(this, updates)
			this.updatedAt = new Date()
		}
	}

	protected validate() {
		validateProps(
			[
				() => (!this.email ? 'email is missing or empty' : null),
				() => (!this.passwordHash ? 'passwordHash is missing or empty' : null),
				() =>
					!Object.values(UserRole).includes(this.role)
						? `role is invalid (received: ${this.role})`
						: null,
			],
			{
				email: this.email,
				passwordHash: this.passwordHash ? '***' : undefined,
				role: this.role,
			},
		)
	}
}

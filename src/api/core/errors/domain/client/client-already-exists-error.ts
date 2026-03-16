import { DomainError } from '@/shared'
import { HttpStatusCode } from '@/shared/core/enums/http-status-code'

export class ClientAlreadyExistsError extends DomainError {
	constructor(message: string = 'Client already exists') {
		super(message, HttpStatusCode.CONFLICT, `${new.target.name}`)
	}
}

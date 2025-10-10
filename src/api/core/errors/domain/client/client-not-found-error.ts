import { DomainError } from '@/shared'
import { HttpStatusCode } from '@/shared/core/enums/http-status-code'

export class ClientNotFoundError extends DomainError {
	constructor(message: string = 'Client not found') {
		super(message, HttpStatusCode.NOT_FOUND, `${new.target.name}`)
	}
}

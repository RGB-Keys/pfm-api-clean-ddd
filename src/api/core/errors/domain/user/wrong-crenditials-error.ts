import { DomainError } from '@/shared'
import { HttpStatusCode } from '@/shared/core/enums/http-status-code'

export class WrongCrenditialsError extends DomainError {
	constructor(message: string = 'Credencials are not valid.') {
		super(message, HttpStatusCode.BAD_REQUEST, `${new.target.name}`)
	}
}

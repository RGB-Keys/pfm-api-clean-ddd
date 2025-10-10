import { DomainError } from '@/shared'
import { HttpStatusCode } from '@/shared/core/enums/http-status-code'

export class IncomeNotFoundError extends DomainError {
	constructor(message: string = 'Income not found') {
		super(message, HttpStatusCode.NOT_FOUND, `${new.target.name}`)
	}
}

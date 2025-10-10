import { DomainError } from '@/shared'
import { HttpStatusCode } from '@/shared/core/enums/http-status-code'

export class ExpenseNotFoundError extends DomainError {
	constructor(message: string = 'Expense not found') {
		super(message, HttpStatusCode.NOT_FOUND, `${new.target.name}`)
	}
}

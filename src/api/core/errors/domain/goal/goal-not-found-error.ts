import { DomainError } from '@/shared'
import { HttpStatusCode } from '@/shared/core/enums/http-status-code'

export class GoalNotFoundError extends DomainError {
	constructor(message: string = 'Goal not found') {
		super(message, HttpStatusCode.NOT_FOUND, `${new.target.name}`)
	}
}

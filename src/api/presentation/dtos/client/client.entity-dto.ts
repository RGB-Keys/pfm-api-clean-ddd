import { ApiProperty, OmitType } from '@nestjs/swagger'
import { ExpenseBaseEntity } from '../expense/expense.entity-dto'
import { GoalBaseEntity } from '../goal/goal.entity-dto'
import { IncomeBaseEntity } from '../income/income.entity-dto'
import { UserBaseEntity } from '../user/user.entity-dto'

export class ClientBaseEntity {
	@ApiProperty({
		type: 'string',
		format: 'uuid',
	})
	id: string

	@ApiProperty({
		type: 'string',
	})
	name: string

	@ApiProperty({
		type: 'string',
		nullable: true,
	})
	phoneNumber?: number | null

	@ApiProperty({
		type: 'number',
		format: 'decimal',
		nullable: true,
	})
	monthlyIncome?: number | null

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

export class ClientResponseEntity extends OmitType(UserBaseEntity, [
	'passwordHash',
]) {}

export class ClientMonthlyIncomeResponseEntity extends OmitType(
	ClientBaseEntity,
	['createdAt', 'updatedAt', 'name', 'phoneNumber'],
) {}

export class ClientIncomeResponseEntity extends IncomeBaseEntity {}

export class ClientExpenseResponseEntity extends ExpenseBaseEntity {}

export class ClientGoalResponseEntity extends GoalBaseEntity {}

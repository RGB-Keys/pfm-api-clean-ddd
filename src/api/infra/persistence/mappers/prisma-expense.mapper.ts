import { ExpenseSummaryDTO } from '@/api/application/dtos/expense.dto'
import { Expense } from '@/api/domain/entities/expense.entity'
import { Category } from '@/api/domain/entities/value-objects/category.value-object'
import { Money } from '@/api/domain/entities/value-objects/money.value-object'
import { UniqueEntityId } from '@/shared'
import { Expense as PrismaExpense } from '@prisma/client'

export class PrismaExpenseMapper {
	static toDomain(persistence: PrismaExpense): Expense {
		return Expense.restore(
			{
				amount: new Money(Number(persistence.amount)),
				clientId: new UniqueEntityId(persistence.clientId),
				date: persistence.date,
				category: persistence.category
					? new Category(persistence.category)
					: undefined,
				description: persistence.description ?? undefined,
				updatedAt: persistence.updatedAt ?? undefined,
			},
			new UniqueEntityId(persistence.id),
		)
	}
}

export function ExpenseSummarytoDTO(
	persistence: PrismaExpense,
): ExpenseSummaryDTO {
	return {
		id: new UniqueEntityId(persistence.id),
		clientId: new UniqueEntityId(persistence.clientId),
		amount: new Money(Number(persistence.amount)),
		date: persistence.date,
		category: persistence.category
			? new Category(persistence.category)
			: undefined,
		description: persistence.description ?? undefined,
		updatedAt: persistence.updatedAt ?? undefined,
	}
}

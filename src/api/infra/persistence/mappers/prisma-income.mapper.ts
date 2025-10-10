import { IncomeSummaryDTO } from '@/api/application/dtos/income.dto'
import { Income } from '@/api/domain/entities/income.entity'
import { Category } from '@/api/domain/entities/value-objects/category.value-object'
import { Money } from '@/api/domain/entities/value-objects/money.value-object'
import { UniqueEntityId } from '@/shared'
import { Income as PrismaIncome } from '@prisma/client'

export class PrismaIncomeMapper {
	static toDomain(persistence: PrismaIncome): Income {
		return Income.restore(
			{
				amount: new Money(Number(persistence.amount)),
				clientId: new UniqueEntityId(persistence.clientId),
				date: persistence.date,
				category: persistence.category
					? new Category(persistence.category)
					: undefined,
				description: persistence.description,
				updatedAt: persistence.updatedAt ?? undefined,
			},
			new UniqueEntityId(persistence.id),
		)
	}
}

export function IncomeSummarytoDTO(
	persistence: PrismaIncome,
): IncomeSummaryDTO {
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

import { ClientRepository } from '@/api/application/repositories/client.repository'
import { Money } from '@/api/domain/entities/value-objects/money.value-object'
import { EventPayloads, JOBS } from '@/shared'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class BalanceWorker {
	private readonly logger = new Logger(JOBS.BALANCE)

	constructor(private readonly clientRepository: ClientRepository) {}

	async execute({ clientId }: EventPayloads['balance']) {
		const client = await this.clientRepository.findUnique({ clientId })

		if (!client) {
			this.logger.warn(`Client ${clientId} not found`)
			return
		}

		const safeAmount = (amount?: Money | null) => {
			if (!amount) return new Money(0)
			return amount
		}

		const totalIncomes = client.incomes.items.reduce(
			(sum, i) => sum.add(safeAmount(i.amount)),
			new Money(0),
		)
		const totalExpenses = client.expenses.items.reduce(
			(sum, e) => sum.add(safeAmount(e.amount)),
			new Money(0),
		)
		const baseIncome = safeAmount(client.monthlyIncome)

		const newBalance = baseIncome.add(totalIncomes).subtract(totalExpenses)

		client.setMonthlyIncome(newBalance)
		await this.clientRepository.save(client)

		this.logger.log(`Balance updated for client ${clientId}`)
	}
}

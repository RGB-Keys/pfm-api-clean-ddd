import { Income } from '@/api/domain/entities/income.entity'

export class IncomeSummaryPresenter {
	static toHttp(income: Income) {
		return {
			id: income.id.toString(),
			clientId: income.clientId.toString(),
			amount: income.amount.value.parsedAmount,
			description: income.description,
			category: income.category?.value.category,
			date: income.date,
			updatedAt: income.updatedAt,
		}
	}

	static toHttpList(incomes: Income[]) {
		return incomes.map((income) => this.toHttp(income))
	}
}

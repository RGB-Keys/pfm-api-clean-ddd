import { Expense } from '@/api/domain/entities/expense.entity'

export class ExpenseSummaryPresenter {
	static toHttp(expense: Expense) {
		return {
			id: expense.id.toString(),
			clientId: expense.clientId.toString(),
			amount: expense.amount.value.parsedAmount,
			description: expense.description,
			category: expense.category?.value.category,
			date: expense.date,
			updatedAt: expense.updatedAt,
		}
	}

	static toHttpList(expenses: Expense[]) {
		return expenses.map((expense) => this.toHttp(expense))
	}
}

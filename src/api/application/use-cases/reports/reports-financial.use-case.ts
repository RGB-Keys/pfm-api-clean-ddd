import { ClientNotFoundError } from '@/api/core/errors/domain/client/client-not-found-error'
import { Client } from '@/api/domain/entities/client.entity'
import { Money } from '@/api/domain/entities/value-objects/money.value-object'
import { Either, fail, success } from '@/shared'
import {
	ClientRepository,
	FinancialReport,
} from '../../repositories/client.repository'

export interface FinancialReportUseCaseRequest {
	clientId: string
}

export type FinancialReportUseCaseResponse = Either<
	ClientNotFoundError,
	{
		report: FinancialReport
	}
>

export class FinancialReportUseCase {
	constructor(private readonly clientRepository: ClientRepository) {}

	public async execute({
		clientId,
	}: FinancialReportUseCaseRequest): Promise<FinancialReportUseCaseResponse> {
		const client = await this.clientRepository.findUnique({ clientId })

		if (!client) return fail(new ClientNotFoundError())

		console.time('ReportGeneration') // Inicia a contagem de tempo

		// A MÁGICA ACONTECE AQUI: Promise.all dispara todas as funções ao mesmo tempo.
		// Ele aguardará até que a mais demorada termine.
		const [expensesByCategory, incomesByCategory, goalsProgress] =
			await Promise.all([
				this.calculateExpensesByCategory(client),
				this.calculateIncomesByCategory(client),
				this.calculateGoalsProgress(client),
			])

		// Após a conclusão dos cálculos paralelos, fazemos os cálculos finais simples.
		const totalExpenses = Object.values(expensesByCategory).reduce(
			(sum, amount) => sum + amount,
			0,
		)
		const totalIncomes = Object.values(incomesByCategory).reduce(
			(sum, amount) => sum + amount,
			0,
		)
		const netBalance = totalIncomes - totalExpenses

		console.timeEnd('ReportGeneration') // Finaliza a contagem de tempo

		return success({
			report: {
				generatedAt: new Date(),
				totalIncomes,
				totalExpenses,
				netBalance,
				expensesByCategory,
				incomesByCategory,
				goalsProgress,
			},
		})
	}

	// --- MÉTODOS AUXILIARES (Cada um é uma tarefa independente) ---

	private async calculateExpensesByCategory(
		client: Client,
	): Promise<Record<string, number>> {
		const expensesMap: Record<string, Money> = {}

		for (const expense of client.expenses.items) {
			// Usa 'Sem Categoria' se a categoria não estiver definida
			const categoryName = expense.category?.name ?? 'Sem Categoria'
			if (!expensesMap[categoryName]) {
				expensesMap[categoryName] = new Money(0)
			}
			expensesMap[categoryName] = expensesMap[categoryName].add(expense.amount)
		}

		// Converte o mapa de Money para um mapa de number para o relatório final
		return this.convertMoneyMapToNumberMap(expensesMap)
	}

	private async calculateIncomesByCategory(
		client: Client,
	): Promise<Record<string, number>> {
		const incomesMap: Record<string, Money> = {}

		// Adiciona a renda mensal principal a uma categoria padrão
		if (client.monthlyIncome?.amount > 0) {
			incomesMap['Renda Mensal Fixa'] = client.monthlyIncome
		}

		for (const income of client.incomes.items) {
			const categoryName = income.category?.name ?? 'Outras Receitas'
			if (!incomesMap[categoryName]) {
				incomesMap[categoryName] = new Money(0)
			}
			incomesMap[categoryName] = incomesMap[categoryName].add(income.amount)
		}

		return this.convertMoneyMapToNumberMap(incomesMap)
	}

	private async calculateGoalsProgress(
		client: Client,
	): Promise<FinancialReport['goalsProgress']> {
		// Esta operação é principalmente de transformação de dados e não depende de I/O.
		return client.goals.items.map((goal) => ({
			goalId: goal.id.toString(),
			targetAmount: goal.target.amount,
			savedAmount: goal.saved.amount,
			progressPercent: goal.progressPercent(), // Usa o método já existente na sua entidade!
		}))
	}

	private convertMoneyMapToNumberMap(
		moneyMap: Record<string, Money>,
	): Record<string, number> {
		const numberMap: Record<string, number> = {}
		for (const key in moneyMap) {
			numberMap[key] = moneyMap[key].amount
		}
		return numberMap
	}
}

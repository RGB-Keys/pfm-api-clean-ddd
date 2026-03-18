import { Client } from '@/api/domain/entities/client.entity'

export abstract class ClientRepository {
	abstract findUnique(params: FindUniqueClientParams): Promise<Client | null>
	abstract create(client: Client): Promise<void>
	abstract save(client: Client): Promise<void>
	abstract remove(client: Client): Promise<void>
}

export interface FindUniqueClientParams {
	clientId?: string
	email?: string
}

export interface FinancialReport {
	generatedAt: Date
	totalIncomes: number
	totalExpenses: number
	netBalance: number
	expensesByCategory: Record<string, number>
	incomesByCategory: Record<string, number>
	goalsProgress: Array<{
		goalId: string
		targetAmount: number
		savedAmount: number
		progressPercent: number
	}>
}

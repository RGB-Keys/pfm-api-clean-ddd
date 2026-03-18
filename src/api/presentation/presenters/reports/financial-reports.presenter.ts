import { FinancialReport } from '@/api/application/repositories/client.repository'

export class FinancialReportPresenter {
	static toHTTP(report: FinancialReport) {
		return {
			metadata: {
				generatedAt: report.generatedAt.toISOString(),
			},
			summary: {
				netBalance: Number(report.netBalance.toFixed(2)),
				totalIncomes: Number(report.totalIncomes.toFixed(2)),
				totalExpenses: Number(report.totalExpenses.toFixed(2)),
			},
			breakdown: {
				expensesByCategory: report.expensesByCategory,
				incomesByCategory: report.incomesByCategory,
			},
			goals: report.goalsProgress.map((goal) => ({
				id: goal.goalId,
				targetAmount: Number(goal.targetAmount.toFixed(2)),
				savedAmount: Number(goal.savedAmount.toFixed(2)),
				progressPercentage: Number(goal.progressPercent.toFixed(1)),
				status: goal.progressPercent >= 100 ? 'COMPLETED' : 'IN_PROGRESS',
			})),
		}
	}
}

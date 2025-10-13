export class MonthlyIncomePresenter {
	static toHttp(clientId: string, monthlyIncome: number) {
		return {
			id: clientId,
			monthlyIncome,
		}
	}
}

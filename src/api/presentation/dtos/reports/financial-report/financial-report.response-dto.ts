import { ApiProperty } from '@nestjs/swagger'

export class FinancialReportGoalProgressDto {
	@ApiProperty({
		type: 'string',
		format: 'uuid',
		description: 'ID da meta',
	})
	goalId: string

	@ApiProperty({
		type: 'number',
		format: 'decimal',
		example: 5000.0,
		description: 'Valor alvo da meta',
	})
	targetAmount: number

	@ApiProperty({
		type: 'number',
		format: 'decimal',
		example: 1500.5,
		description: 'Valor já economizado',
	})
	savedAmount: number

	@ApiProperty({
		type: 'number',
		format: 'float',
		example: 30.1,
		description: 'Porcentagem de conclusão (0-100)',
	})
	progressPercent: number
}

export class FinancialReportResponseDto {
	@ApiProperty({
		type: 'string',
		format: 'date-time',
		description: 'Data e hora da geração do relatório',
	})
	generatedAt: Date

	@ApiProperty({
		type: 'number',
		format: 'decimal',
		example: 4500.0,
		description: 'Total de entradas no período',
	})
	totalIncomes: number

	@ApiProperty({
		type: 'number',
		format: 'decimal',
		example: 2300.0,
		description: 'Total de saídas no período',
	})
	totalExpenses: number

	@ApiProperty({
		type: 'number',
		format: 'decimal',
		example: 2200.0,
		description: 'Saldo líquido (Entradas - Saídas)',
	})
	netBalance: number

	@ApiProperty({
		description: 'Mapa de despesas agrupadas por nome da categoria',
		example: {
			Alimentação: 500.0,
			Transporte: 200.0,
			Lazer: 150.0,
		},
		// O Swagger precisa dessa configuração para entender Map/Record dinâmico
		type: 'object',
		additionalProperties: {
			type: 'number',
			format: 'decimal',
		},
	})
	expensesByCategory: Record<string, number>

	@ApiProperty({
		description: 'Mapa de receitas agrupadas por nome da categoria',
		example: {
			Salário: 3500.0,
			Freelance: 1000.0,
		},
		type: 'object',
		additionalProperties: {
			type: 'number',
			format: 'decimal',
		},
	})
	incomesByCategory: Record<string, number>

	@ApiProperty({
		type: [FinancialReportGoalProgressDto],
		description: 'Lista com o progresso das metas financeiras',
	})
	goalsProgress: FinancialReportGoalProgressDto[]
}

import { ApiProperty } from '@nestjs/swagger'

export class IncomeBaseEntity {
	@ApiProperty({
		type: 'string',
		format: 'uuid',
	})
	id: string

	@ApiProperty({
		type: 'number',
		format: 'decimal',
	})
	amount: number

	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	date: Date

	@ApiProperty({
		type: 'string',
		nullable: true,
	})
	description?: string

	@ApiProperty({
		type: 'string',
		nullable: true,
	})
	category?: string

	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	updatedAt: Date
}

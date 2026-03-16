import { ApiProperty } from '@nestjs/swagger'

export class GoalBaseEntity {
	@ApiProperty({
		type: 'string',
		format: 'uuid',
	})
	id: string

	@ApiProperty({
		type: 'string',
		format: 'uuid',
	})
	clientId: string

	@ApiProperty({
		type: 'number',
		format: 'decimal',
	})
	target: number

	@ApiProperty({
		type: 'number',
		format: 'decimal',
	})
	saved: number

	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	startedAt: Date

	@ApiProperty({
		type: 'string',
		format: 'date-time',
		nullable: true,
	})
	endedAt?: Date

	@ApiProperty({
		type: 'string',
		format: 'date-time',
	})
	updatedAt: Date
}

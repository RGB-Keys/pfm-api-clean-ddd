import { Optional } from '@/shared/core/types/optional'
import { validateProps } from '@/shared/core/utils/validateProps.utils'
import { Entity, UniqueEntityId } from '@shared'
import { Category } from './value-objects/category.value-object'
import { Money } from './value-objects/money.value-object'

export interface IncomeProps {
	clientId: Income['clientId']
	amount: Income['amount']
	date: Income['date']
	description?: Income['description']
	category?: Income['category']
	updatedAt?: Income['updatedAt']
}

export class Income extends Entity {
	readonly clientId: UniqueEntityId
	public amount: Money
	public date: Date
	public description?: string | null
	public category?: Category | null
	public updatedAt?: Date | null

	private constructor(props: IncomeProps, id?: UniqueEntityId) {
		super(id)

		this.clientId = props.clientId
		this.amount = props.amount
		this.date = props.date
		this.description = props.description
		this.category = props.category
		this.updatedAt = props.updatedAt

		this.validate()
	}

	public updateAmount(newAmount: Money) {
		this.amount = newAmount
		this.updatedAt = new Date()
	}

	static create(props: IncomeCreateArgs, id?: UniqueEntityId): Income {
		return new Income(
			{
				...props,
				date: props.date ?? new Date(),
				category: props.category ?? null,
			},
			id,
		)
	}

	static restore(input: IncomeProps, id?: UniqueEntityId): Income {
		return new Income(input, id)
	}

	private validate() {
		validateProps(
			[
				() => (!this.clientId ? 'clientId is missing or empty' : null),
				() => (!this.amount ? 'amount is missing or empty' : null),
			],
			{
				amount: this.amount,
				date: this.date,
				description: this.description,
				category: this.category,
			},
		)
	}
}

type IncomeCreateArgs = Optional<IncomeProps, 'date' | 'category'>

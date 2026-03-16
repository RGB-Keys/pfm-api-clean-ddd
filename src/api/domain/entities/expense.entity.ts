import { Optional } from '@/shared/core/types/optional'
import { validateProps } from '@/shared/core/utils/validateProps.utils'
import { Entity, UniqueEntityId } from '@shared'
import { Category } from './value-objects/category.value-object'
import { Money } from './value-objects/money.value-object'

export interface ExpenseProps {
	clientId: Expense['clientId']
	amount: Expense['amount']
	date: Expense['date']
	description?: Expense['description']
	category?: Expense['category']
	updatedAt?: Expense['updatedAt']
}

export class Expense extends Entity {
	readonly clientId: UniqueEntityId
	public amount: Money
	public date: Date
	public description?: string | null
	public category?: Category | null
	public updatedAt?: Date | null

	private constructor(props: ExpenseProps, id?: UniqueEntityId) {
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

	static create(props: ExpenseCreateArgs, id?: UniqueEntityId): Expense {
		return new Expense(
			{
				...props,
				category: props.category ?? null,
				date: props.date ?? new Date(),
			},
			id,
		)
	}

	static restore(input: ExpenseProps, id?: UniqueEntityId): Expense {
		return new Expense(input, id)
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

type ExpenseCreateArgs = Optional<ExpenseProps, 'date' | 'category'>

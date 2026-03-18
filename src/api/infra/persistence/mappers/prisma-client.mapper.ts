import { Client } from '@/api/domain/entities/client.entity'
import { Expense } from '@/api/domain/entities/expense.entity'
import { Goal } from '@/api/domain/entities/goal.entity'
import { Income } from '@/api/domain/entities/income.entity'
import { Category } from '@/api/domain/entities/value-objects/category.value-object'
import { Money } from '@/api/domain/entities/value-objects/money.value-object'
import { ExpenseList } from '@/api/domain/entities/watched-lists/expense.watched-list'
import { GoalList } from '@/api/domain/entities/watched-lists/goal.watched-list'
import { IncomeList } from '@/api/domain/entities/watched-lists/income.watched-list'
import { UserRole } from '@/api/domain/enums/user/role'
import { UniqueEntityId } from '@/shared'
import {
	Prisma,
	Client as PrismaClient,
	Expense as PrismaExpense,
	Goal as PrismaGoal,
	Income as PrismaIncome,
	User as PrismaUser,
} from '@prisma/client'

type PrismaClientWithUser = PrismaClient & {
	user: PrismaUser
	expenses: PrismaExpense[]
	incomes: PrismaIncome[]
	goals: PrismaGoal[]
}

export class PrismaClientMapper {
	static toDomain(persistence: PrismaClientWithUser): Client {
		const { user, expenses, goals, incomes } = persistence

		return Client.restore(
			{
				email: user.email,
				passwordHash: user.passwordHash,
				role: user.role as UserRole,
				avatarUrl: user.avatarUrl,
				name: persistence.name,
				monthlyIncome: new Money(Number(persistence.monthlyIncome)),
				balance: new Money(Number(persistence.balance)),
				phoneNumber: persistence.phoneNumber,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt ?? undefined,
				expenses: new ExpenseList(
					expenses.map((expense) =>
						Expense.restore(
							{
								clientId: new UniqueEntityId(expense.clientId),
								amount: new Money(Number(expense.amount)),
								date: expense.date,
								category: expense.category
									? new Category(expense.category)
									: undefined,
								description: expense.description ?? undefined,
								updatedAt: expense.updatedAt ?? undefined,
							},
							new UniqueEntityId(expense.id),
						),
					),
				),
				incomes: new IncomeList(
					incomes.map((income) =>
						Income.restore(
							{
								clientId: new UniqueEntityId(income.clientId),
								amount: new Money(Number(income.amount)),
								date: income.date,
								category: income.category
									? new Category(income.category)
									: undefined,
								description: income.description ?? undefined,
								updatedAt: income.updatedAt ?? undefined,
							},
							new UniqueEntityId(income.id),
						),
					),
				),
				goals: new GoalList(
					goals.map((goal) =>
						Goal.restore(
							{
								clientId: new UniqueEntityId(goal.clientId),
								target: new Money(Number(goal.target)),
								saved: new Money(Number(goal.saved)),
								startedAt: goal.startedAt,
								endedAt: goal.endedAt ?? undefined,
								updatedAt: goal.updatedAt ?? undefined,
							},
							new UniqueEntityId(goal.id),
						),
					),
				),
			},
			new UniqueEntityId(persistence.id),
		)
	}

	static toPrismaCreate(domainClient: Client): Prisma.ClientCreateInput {
		return {
			id: domainClient.id.toString(),
			name: domainClient.name,
			phoneNumber: domainClient.phoneNumber ?? undefined,
			monthlyIncome: domainClient.monthlyIncome
				? new Prisma.Decimal(domainClient.monthlyIncome.value.parsedAmount)
				: undefined,
			balance: domainClient.balance
				? new Prisma.Decimal(domainClient.balance.value.parsedAmount)
				: undefined,
			user: {
				create: {
					email: domainClient.email,
					passwordHash: domainClient.passwordHash,
					role: 'CLIENT',
					avatarUrl: domainClient.avatarUrl,
					createdAt: domainClient.createdAt,
					updatedAt: domainClient.updatedAt ?? undefined,
				},
			},
		}
	}

	static toPrismaUpdate(domainClient: Client): Prisma.ClientUpdateInput {
		const updateData: Prisma.ClientUpdateInput = {
			name: domainClient.name,
			phoneNumber: domainClient.phoneNumber ?? undefined,
			balance: new Prisma.Decimal(domainClient.balance.amount),
			user: {
				update: {
					email: domainClient.email,
					passwordHash: domainClient.passwordHash,
					avatarUrl: domainClient.avatarUrl,
				},
			},
			incomes: domainClient.incomes.items.length
				? {
						upsert: domainClient.incomes.items.map((income) => ({
							where: { id: income.id.toString() },
							create: {
								id: income.id.toString(),
								amount: new Prisma.Decimal(income.amount.value.parsedAmount),
								category: income.category?.value.category,
								date: income.date,
								description: income.description ?? undefined,
								updatedAt: income.updatedAt ?? undefined,
							},
							update: {
								amount: new Prisma.Decimal(income.amount.value.parsedAmount),
								category: income.category?.value.category,
								date: income.date,
								description: income.description ?? undefined,
								updatedAt: income.updatedAt ?? undefined,
							},
						})),
					}
				: undefined,
			expenses: domainClient.expenses.items.length
				? {
						upsert: domainClient.expenses.items.map((expense) => ({
							where: { id: expense.id.toString() },
							create: {
								id: expense.id.toString(),
								amount: new Prisma.Decimal(expense.amount.value.parsedAmount),
								category: expense.category?.value.category,
								date: expense.date,
								description: expense.description ?? undefined,
								updatedAt: expense.updatedAt ?? undefined,
							},
							update: {
								amount: new Prisma.Decimal(expense.amount.value.parsedAmount),
								category: expense.category?.value.category,
								date: expense.date,
								description: expense.description ?? undefined,
								updatedAt: expense.updatedAt ?? undefined,
							},
						})),
					}
				: undefined,
			goals: domainClient.goals.items.length
				? {
						upsert: domainClient.goals.items.map((goal) => ({
							where: { id: goal.id.toString() },
							create: {
								id: goal.id.toString(),
								target: new Prisma.Decimal(goal.target.value.parsedAmount),
								saved: new Prisma.Decimal(goal.saved.value.parsedAmount),
								startedAt: goal.startedAt,
								endedAt: goal.endedAt ?? undefined,
								updatedAt: goal.updatedAt ?? undefined,
							},
							update: {
								target: new Prisma.Decimal(goal.target.value.parsedAmount),
								saved: new Prisma.Decimal(goal.saved.value.parsedAmount),
								startedAt: goal.startedAt,
								endedAt: goal.endedAt ?? undefined,
								updatedAt: goal.updatedAt ?? undefined,
							},
						})),
					}
				: undefined,
		}

		if (domainClient.monthlyIncome) {
			updateData.monthlyIncome = new Prisma.Decimal(
				domainClient.monthlyIncome.value.parsedAmount,
			)
		}

		return updateData
	}
}

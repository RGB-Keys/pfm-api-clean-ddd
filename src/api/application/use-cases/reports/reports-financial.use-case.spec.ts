import { Client } from '@/api/domain/entities/client.entity'
import { Expense } from '@/api/domain/entities/expense.entity'
import { Income } from '@/api/domain/entities/income.entity'
import { Category } from '@/api/domain/entities/value-objects/category.value-object'
import { Money } from '@/api/domain/entities/value-objects/money.value-object'
import { UniqueEntityId } from '@/shared'
import { ClientRepository } from '../../repositories/client.repository'
import { FinancialReportUseCase } from './reports-financial.use-case'

describe('Reports Financial Use Case', async () => {
	let clientRepository: ClientRepository
	let sut: FinancialReportUseCase

	beforeEach(() => {
		clientRepository = {
			create: vi.fn(),
			findUnique: vi.fn(),
			save: vi.fn(),
		} as unknown as ClientRepository

		sut = new FinancialReportUseCase(clientRepository)
	})

	it('should be able to get financial reports', async () => {
		const { client } = await mockClient()

		vi.spyOn(clientRepository, 'findUnique').mockResolvedValueOnce(client)

		const result = await sut.execute({
			clientId: client.id.toString(),
		})

		expect(result.isSuccess()).toBe(true)
		console.log(result.value)
	})

	const mockClient = async () => {
		const client = Client.create({
			email: 'teste@gmail.com',
			name: 'testualdo',
			passwordHash: 'some_password',
		})

		client.setMonthlyIncome(new Money(1000))
		await clientRepository.create(client)

		const income = Income.create({
			clientId: new UniqueEntityId(client.id.toString()),
			amount: new Money(700),
			category: new Category('Aluguel'),
			date: new Date('2025-08-20'),
			description: 'Aluguel do apto',
		})

		const income02 = Income.create({
			clientId: new UniqueEntityId(client.id.toString()),
			amount: new Money(700),
			category: new Category('Aluguel'),
			date: new Date('2025-08-21'),
			description: 'Aluguel do apto',
		})

		const expense = Expense.create({
			clientId: new UniqueEntityId(client.id.toString()),
			amount: new Money(300),
			category: new Category('Mercadinho'),
			date: new Date('2025-08-20'),
			description: 'Compras de casa',
		})

		const expense02 = Expense.create({
			clientId: new UniqueEntityId(client.id.toString()),
			amount: new Money(200),
			category: new Category('Mercadinho'),
			date: new Date('2025-08-21'),
			description: 'Compras de casa',
		})

		const expense03 = Expense.create({
			clientId: new UniqueEntityId(client.id.toString()),
			amount: new Money(150),
			category: new Category('Exame'),
			date: new Date('2025-08-20'),
			description: 'Exame médico',
		})

		client.addIncome(income)
		client.addIncome(income02)
		client.addExpense(expense)
		client.addExpense(expense02)
		client.addExpense(expense03)
		await clientRepository.save(client)

		return { client }
	}
})

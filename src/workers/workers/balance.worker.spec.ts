import { ClientRepository } from '@/api/application/repositories/client.repository'
import { Client } from '@/api/domain/entities/client.entity'
import { Expense } from '@/api/domain/entities/expense.entity'
import { Income } from '@/api/domain/entities/income.entity'
import { Category } from '@/api/domain/entities/value-objects/category.value-object'
import { Money } from '@/api/domain/entities/value-objects/money.value-object'
import { UniqueEntityId } from '@/shared'
import { BalanceWorker } from './balance.worker'

let clientRepository: ClientRepository
let sut: BalanceWorker

describe('BalanceWorker', () => {
	beforeEach(() => {
		clientRepository = {
			create: vi.fn(),
			findUnique: vi.fn(),
			save: vi.fn(),
		} as unknown as ClientRepository

		sut = new BalanceWorker(clientRepository)
	})

	it('should be able to recalculate balance', async () => {
		const { client } = await mockClient()

		const findClient = vi
			.spyOn(clientRepository, 'findUnique')
			.mockResolvedValueOnce(client)

		const event = { clientId: client.id.toString() }

		await sut.execute(event)

		expect(findClient).toHaveBeenCalledWith({
			clientId: client.id.toString(),
		})
		expect(client.balance.value.parsedAmount).toBe(1400)
		expect(clientRepository.save).toHaveBeenCalled()
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

		const expense = Expense.create({
			clientId: new UniqueEntityId(client.id.toString()),
			amount: new Money(300),
			category: new Category('Mercadinho'),
			date: new Date('2025-08-20'),
			description: 'Compras de casa',
		})

		client.addIncome(income)
		client.addExpense(expense)
		await clientRepository.save(client)

		return { client }
	}
})

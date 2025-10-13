import { CreateExpenseUseCase } from '@/api/application/use-cases/client/create-expense.use-case'
import { ClientNotFoundError } from '@/api/core/errors/domain/client/client-not-found-error'
import { CurrentUser } from '@/api/infra/http/auth/current-user-decorator'
import { JwtAuthGuard } from '@/api/infra/http/auth/jwt-auth.guard'
import type { UserPayload } from '@/api/infra/http/auth/jwt.strategy'
import { SWAGGER_TAGS } from '@/api/infra/http/swagger/tags/swagger-tags'
import { CreateExpenseDto } from '@/api/presentation/dtos/client/create-expense/create-expense.dto'
import { CreateExpenseResponseDto } from '@/api/presentation/dtos/client/create-expense/create-expense.response-dto'
import { ExpenseSummaryPresenter } from '@/api/presentation/presenters/expense/expense-summary.presenter'
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

@ApiTags(SWAGGER_TAGS.CLIENT)
@Controller('clients/expenses')
export class CreateExpenseController {
	constructor(private readonly createExpenseUseCase: CreateExpenseUseCase) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@HttpCode(HttpStatus.CREATED)
	@ApiCreatedResponse({
		description: 'Expense has been successfully added.',
		type: CreateExpenseResponseDto,
	})
	async handler(
		@Body() createExpenseDto: CreateExpenseDto,
		@CurrentUser() user: UserPayload,
	) {
		const clientId = user.sub

		const result = await this.createExpenseUseCase.execute({
			...createExpenseDto,
			clientId,
		})

		if (result.isFail()) {
			const error = result.value

			if (error instanceof ClientNotFoundError)
				throw new NotFoundException('Client not found.')

			throw new Error('Unhandled Error.')
		}

		return ExpenseSummaryPresenter.toHttp(result.value.expense)
	}
}

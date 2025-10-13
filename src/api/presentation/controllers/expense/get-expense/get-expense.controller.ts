import { GetExpenseUseCase } from '@/api/application/use-cases/expense/get-expense.use-case'
import { CurrentUser } from '@/api/infra/http/auth/current-user-decorator'
import { JwtAuthGuard } from '@/api/infra/http/auth/jwt-auth.guard'
import type { UserPayload } from '@/api/infra/http/auth/jwt.strategy'
import { SWAGGER_TAGS } from '@/api/infra/http/swagger/tags/swagger-tags'
import { GetExpenseResponseDto } from '@/api/presentation/dtos/expense/get-expense/get-expense.response-dto'
import { ExpenseSummaryPresenter } from '@/api/presentation/presenters/expense/expense-summary.presenter'
import { NotAllowedError } from '@/shared'
import {
	BadRequestException,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags(SWAGGER_TAGS.EXPENSE)
@Controller('expenses/:expenseId')
export class GetExpenseController {
	constructor(private readonly getExpenseUseCase: GetExpenseUseCase) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: GetExpenseResponseDto })
	async handler(
		@Param('expenseId') expenseId: string,
		@CurrentUser() user: UserPayload,
	) {
		const clientId = user.sub

		const result = await this.getExpenseUseCase.execute({ clientId, expenseId })

		if (result.isFail()) {
			const error = result.value

			if (error instanceof NotAllowedError)
				throw new BadRequestException('Not Allowed.')

			throw new Error('Unhandled Error')
		}

		return ExpenseSummaryPresenter.toHttp(result.value.expense)
	}
}

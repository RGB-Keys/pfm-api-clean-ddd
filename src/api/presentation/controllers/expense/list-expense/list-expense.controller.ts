import { ListExpenseUseCase } from '@/api/application/use-cases/expense/list-expense.use-case'
import { CurrentUser } from '@/api/infra/http/auth/current-user-decorator'
import { JwtAuthGuard } from '@/api/infra/http/auth/jwt-auth.guard'
import type { UserPayload } from '@/api/infra/http/auth/jwt.strategy'
import { SWAGGER_TAGS } from '@/api/infra/http/swagger/tags/swagger-tags'
import { ListExpensesDto } from '@/api/presentation/dtos/expense/list-expense/list-expense.dto'
import { ListExpensesResponseDto } from '@/api/presentation/dtos/expense/list-expense/list-expense.response-dto'
import { ExpenseCollectionPresenter } from '@/api/presentation/presenters/expense/expense-collection.presenter'
import { SearchParams } from '@/shared'
import {
	BadRequestException,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Query,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags(SWAGGER_TAGS.EXPENSE)
@Controller('expenses')
export class ListExpensesController {
	constructor(private readonly listExpensesUseCase: ListExpenseUseCase) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: ListExpensesResponseDto })
	async handler(
		@Query() query: ListExpensesDto,
		@CurrentUser() user: UserPayload,
	): Promise<ExpenseCollectionPresenter> {
		const clientId = user.sub

		const output = await this.listExpensesUseCase.execute(
			new SearchParams({
				filters: {
					clientId,
					expenseId: query.expenseId,
					category: query.category,
					date: query.date,
				},
				pagination: {
					page: query.page,
					perPage: query.limit,
				},
			}),
		)

		if (output.isFail()) {
			throw new BadRequestException(output.value)
		}

		return new ExpenseCollectionPresenter(output.value)
	}
}

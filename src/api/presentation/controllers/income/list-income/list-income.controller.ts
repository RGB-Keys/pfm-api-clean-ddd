import { ListIncomeUseCase } from '@/api/application/use-cases/income/list-income.use-case'
import { CurrentUser } from '@/api/infra/http/auth/current-user-decorator'
import { JwtAuthGuard } from '@/api/infra/http/auth/jwt-auth.guard'
import type { UserPayload } from '@/api/infra/http/auth/jwt.strategy'
import { SWAGGER_TAGS } from '@/api/infra/http/swagger/tags/swagger-tags'
import { ListIncomesDto } from '@/api/presentation/dtos/income/list-income/list-income.dto'
import { ListIncomesResponseDto } from '@/api/presentation/dtos/income/list-income/list-income.response-dto'
import { IncomeCollectionPresenter } from '@/api/presentation/presenters/income/income-collection.presenter'
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

@ApiTags(SWAGGER_TAGS.INCOME)
@Controller('incomes')
export class ListIncomesController {
	constructor(private readonly listIncomesUseCase: ListIncomeUseCase) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: ListIncomesResponseDto })
	async handler(
		@Query() query: ListIncomesDto,
		@CurrentUser() user: UserPayload,
	): Promise<IncomeCollectionPresenter> {
		const clientId = user.sub

		const output = await this.listIncomesUseCase.execute(
			new SearchParams({
				filters: {
					clientId,
					incomeId: query.incomeId,
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

		return new IncomeCollectionPresenter(output.value)
	}
}

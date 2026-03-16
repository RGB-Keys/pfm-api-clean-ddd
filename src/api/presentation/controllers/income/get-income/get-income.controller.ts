import { GetIncomeUseCase } from '@/api/application/use-cases/income/get-income.use-case'
import { CurrentUser } from '@/api/infra/http/auth/current-user-decorator'
import { JwtAuthGuard } from '@/api/infra/http/auth/jwt-auth.guard'
import type { UserPayload } from '@/api/infra/http/auth/jwt.strategy'
import { SWAGGER_TAGS } from '@/api/infra/http/swagger/tags/swagger-tags'
import { GetIncomeResponseDto } from '@/api/presentation/dtos/income/get-income/get-income.response-dto'
import { IncomeSummaryPresenter } from '@/api/presentation/presenters/income/income-summary.presenter'
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

@ApiTags(SWAGGER_TAGS.INCOME)
@Controller('incomes/:incomeId')
export class GetIncomeController {
	constructor(private readonly getIncomeUseCase: GetIncomeUseCase) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: GetIncomeResponseDto })
	async handler(
		@Param('incomeId') incomeId: string,
		@CurrentUser() user: UserPayload,
	) {
		const clientId = user.sub

		const result = await this.getIncomeUseCase.execute({ clientId, incomeId })

		if (result.isFail()) {
			const error = result.value

			if (error instanceof NotAllowedError)
				throw new BadRequestException('Not Allowed.')

			throw new Error('Unhandled Error')
		}

		return IncomeSummaryPresenter.toHttp(result.value.income)
	}
}

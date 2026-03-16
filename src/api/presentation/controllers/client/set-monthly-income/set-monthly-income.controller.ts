import { SetMonthlyIncomeUseCase } from '@/api/application/use-cases/client/set-monthly-income.use-case'
import { ClientNotFoundError } from '@/api/core/errors/domain/client/client-not-found-error'
import { CurrentUser } from '@/api/infra/http/auth/current-user-decorator'
import { JwtAuthGuard } from '@/api/infra/http/auth/jwt-auth.guard'
import type { UserPayload } from '@/api/infra/http/auth/jwt.strategy'
import { SWAGGER_TAGS } from '@/api/infra/http/swagger/tags/swagger-tags'
import { SetMonthlyIncomeDto } from '@/api/presentation/dtos/client/set-monthly-income/set-monthly-income.dto'
import { SetMonthlyIncomeResponseDto } from '@/api/presentation/dtos/client/set-monthly-income/set-monthly-income.response-dto'
import { MonthlyIncomePresenter } from '@/api/presentation/presenters/client/monthly-income.presenter'
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Post,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags(SWAGGER_TAGS.CLIENT)
@Controller('clients/monthlyIncome')
export class SetMonthlyIncomeController {
	constructor(
		private readonly SetMonthlyIncomeUseCase: SetMonthlyIncomeUseCase,
	) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: SetMonthlyIncomeResponseDto })
	async handler(
		@Body() setMonthlyIncomeDto: SetMonthlyIncomeDto,
		@CurrentUser() user: UserPayload,
	) {
		const { amount } = setMonthlyIncomeDto
		const id = user.sub

		const result = await this.SetMonthlyIncomeUseCase.execute({
			clientId: id,
			amount,
		})

		if (result.isFail()) {
			const error = result.value

			if (error instanceof ClientNotFoundError)
				throw new NotFoundException('Client not found.')

			throw new Error('Unhandled Error.')
		}

		const { clientId, monthlyIncome } = result.value

		return MonthlyIncomePresenter.toHttp(clientId, monthlyIncome)
	}
}

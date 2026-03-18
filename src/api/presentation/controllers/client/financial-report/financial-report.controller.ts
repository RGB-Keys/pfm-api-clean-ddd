import { FinancialReportUseCase } from '@/api/application/use-cases/reports/reports-financial.use-case'
import { ClientNotFoundError } from '@/api/core/errors/domain/client/client-not-found-error'
import { CurrentUser } from '@/api/infra/http/auth/current-user-decorator'
import { JwtAuthGuard } from '@/api/infra/http/auth/jwt-auth.guard'
import type { UserPayload } from '@/api/infra/http/auth/jwt.strategy'
import { SWAGGER_TAGS } from '@/api/infra/http/swagger/tags/swagger-tags'
import { FinancialReportResponseDto } from '@/api/presentation/dtos/reports/financial-report/financial-report.response-dto'
import { FinancialReportPresenter } from '@/api/presentation/presenters/reports/financial-reports.presenter'
import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags(SWAGGER_TAGS.FINANCIAL_REPORT)
@Controller('clients/metrics/financial-report')
export class FinancialReportController {
	constructor(
		private readonly financialReportUseCase: FinancialReportUseCase,
	) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: FinancialReportResponseDto,
	})
	async handler(@CurrentUser() user: UserPayload) {
		const result = await this.financialReportUseCase.execute({
			clientId: user.sub,
		})

		if (result.isFail()) {
			const error = result.value

			if (error instanceof ClientNotFoundError)
				throw new NotFoundException('Client not found.')

			throw new Error('Unhandled Error.')
		}

		return FinancialReportPresenter.toHTTP(result.value.report)
	}
}

import { GetGoalUseCase } from '@/api/application/use-cases/goal/get-goal.use-case'
import { CurrentUser } from '@/api/infra/http/auth/current-user-decorator'
import { JwtAuthGuard } from '@/api/infra/http/auth/jwt-auth.guard'
import type { UserPayload } from '@/api/infra/http/auth/jwt.strategy'
import { SWAGGER_TAGS } from '@/api/infra/http/swagger/tags/swagger-tags'
import { GetGoalResponseDto } from '@/api/presentation/dtos/goal/get-goal/get-goal.response-dto'
import { GoalSummaryPresenter } from '@/api/presentation/presenters/goal/goal-summary.presenter'
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

@ApiTags(SWAGGER_TAGS.GOAL)
@Controller('goals/:goalId')
export class GetGoalController {
	constructor(private readonly getGoalUseCase: GetGoalUseCase) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: GetGoalResponseDto })
	async handler(
		@Param('goalId') goalId: string,
		@CurrentUser() user: UserPayload,
	) {
		const clientId = user.sub

		const result = await this.getGoalUseCase.execute({ clientId, goalId })

		if (result.isFail()) {
			const error = result.value

			if (error instanceof NotAllowedError)
				throw new BadRequestException('Not Allowed.')

			throw new Error('Unhandled Error')
		}

		return GoalSummaryPresenter.toHttp(result.value.goal)
	}
}

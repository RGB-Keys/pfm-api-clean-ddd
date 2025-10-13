import { CreateGoalUseCase } from '@/api/application/use-cases/client/create-goal.use-case'
import { ClientNotFoundError } from '@/api/core/errors/domain/client/client-not-found-error'
import { CurrentUser } from '@/api/infra/http/auth/current-user-decorator'
import { JwtAuthGuard } from '@/api/infra/http/auth/jwt-auth.guard'
import type { UserPayload } from '@/api/infra/http/auth/jwt.strategy'
import { SWAGGER_TAGS } from '@/api/infra/http/swagger/tags/swagger-tags'
import { CreateGoalDto } from '@/api/presentation/dtos/client/create-goal/create-goal.dto'
import { CreateGoalResponseDto } from '@/api/presentation/dtos/client/create-goal/create-goal.response-dto'
import { GoalSummaryPresenter } from '@/api/presentation/presenters/goal/goal-summary.presenter'
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
@Controller('clients/goals')
export class CreateGoalController {
	constructor(private readonly createGoalUseCase: CreateGoalUseCase) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@HttpCode(HttpStatus.CREATED)
	@ApiCreatedResponse({
		description: 'Goal has been successfully added.',
		type: CreateGoalResponseDto,
	})
	async handler(
		@Body() createGoalDto: CreateGoalDto,
		@CurrentUser() user: UserPayload,
	) {
		const clientId = user.sub

		const result = await this.createGoalUseCase.execute({
			...createGoalDto,
			clientId,
		})

		if (result.isFail()) {
			const error = result.value

			if (error instanceof ClientNotFoundError)
				throw new NotFoundException('Client not found.')

			throw new Error('Unhandled Error.')
		}

		return GoalSummaryPresenter.toHttp(result.value.goal)
	}
}

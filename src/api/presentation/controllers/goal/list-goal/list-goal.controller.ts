import { ListGoalUseCase } from '@/api/application/use-cases/goal/list-goal.use-case'
import { CurrentUser } from '@/api/infra/http/auth/current-user-decorator'
import { JwtAuthGuard } from '@/api/infra/http/auth/jwt-auth.guard'
import type { UserPayload } from '@/api/infra/http/auth/jwt.strategy'
import { SWAGGER_TAGS } from '@/api/infra/http/swagger/tags/swagger-tags'
import { ListGoalsResponseDto } from '@/api/presentation/dtos/goal/list-goals/list-goals.response-dto'
import { ListGoalsDto } from '@/api/presentation/dtos/goal/list-goals/list-gols.dto'
import { GoalCollectionPresenter } from '@/api/presentation/presenters/goal/goal-collection.presenter'
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

@ApiTags(SWAGGER_TAGS.GOAL)
@Controller('goals')
export class ListGoalsController {
	constructor(private readonly listGoalsUseCase: ListGoalUseCase) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: ListGoalsResponseDto })
	async handler(
		@Query() query: ListGoalsDto,
		@CurrentUser() user: UserPayload,
	): Promise<GoalCollectionPresenter> {
		const clientId = user.sub

		const output = await this.listGoalsUseCase.execute(
			new SearchParams({
				filters: {
					clientId,
					goalId: query.goalId,
					endedAt: query.endedAt,
					startedAt: query.startedAt,
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

		return new GoalCollectionPresenter(output.value)
	}
}

import { RegisterClientUseCase } from '@/api/application/use-cases/user/register/register-client.use-case'
import { ClientAlreadyExistsError } from '@/api/core/errors/domain/client/client-already-exists-error'
import { SWAGGER_TAGS } from '@/api/infra/http/swagger/tags/swagger-tags'
import { RegisterClientDto } from '@/api/presentation/dtos/user/register/register-client.dto'
import { RegisterClientResponseDto } from '@/api/presentation/dtos/user/register/register-client.response-dto'
import { ClientSummaryPresenter } from '@/api/presentation/presenters/user/client-summary.presenter'
import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

@ApiTags(SWAGGER_TAGS.USER)
@Controller('users')
export class RegisterClientController {
	constructor(private readonly registerClientUseCase: RegisterClientUseCase) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiCreatedResponse({
		description: 'Client has been successfully registered.',
		type: RegisterClientResponseDto,
	})
	async handler(@Body() registerClientDto: RegisterClientDto) {
		const result = await this.registerClientUseCase.execute(registerClientDto)

		if (result.isFail()) {
			const error = result.value

			if (error instanceof ClientAlreadyExistsError) {
				throw new BadRequestException('Client exists.')
			}

			throw new Error('Unhandled Error.')
		}

		return ClientSummaryPresenter.toHttp(result.value.client)
	}
}

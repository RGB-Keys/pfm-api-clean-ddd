import { AuthenticateUserUseCase } from '@/api/application/use-cases/user/authenticate/authenticate-user'
import { SWAGGER_TAGS } from '@/api/infra/http/swagger/tags/swagger-tags'
import { AuthenticateUserDto } from '@/api/presentation/dtos/user/authenticate/authenticate-user.dto'
import { AuthenticateUserResponseDto } from '@/api/presentation/dtos/user/authenticate/authenticate-user.response-dto'
import { AuthenticateUserPresenter } from '@/api/presentation/presenters/user/auth-user-summary.presenter'
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags(SWAGGER_TAGS.USER)
@Controller('/auth')
export class AuthenticateUserController {
	constructor(
		private readonly authenticateUserUseCase: AuthenticateUserUseCase,
	) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({ type: AuthenticateUserResponseDto })
	async handler(@Body() authUserDto: AuthenticateUserDto) {
		const { email, password } = authUserDto

		const result = await this.authenticateUserUseCase.execute({
			email,
			password,
		})

		if (result.isFail()) throw new Error()

		const { accessToken, client } = result.value

		return AuthenticateUserPresenter.toHttp(client, accessToken)
	}
}

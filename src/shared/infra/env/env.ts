import z from 'zod'

export const envSchema = z.object({
	DATABASE_URL: z.coerce.string(),
	NODE_ENV: z.enum(['dev', 'test', 'production', 'local']).default('dev'),
	ITEMS_PER_PAGE: z.coerce.number(),
	CURSOR_LIMIT: z.coerce.number().default(20),
	OFFSET_LIMIT: z.coerce.number().default(20),
	REDIS_URL: z.string(),
	REDIS_HOST: z.string(),
	REDIS_PORT: z.coerce.number().optional().default(6379),
	REDIS_USER_NAME: z.string().optional(),
	REDIS_DB: z.coerce.number().optional().default(0),
	REDIS_PASSWORD: z.string(),
	REDIS_KEY_PREFIX: z.string().optional(),
	JWT_PRIVATE_KEY: z.string(),
	JWT_PUBLIC_KEY: z.string(),
	PORT: z.coerce.number().default(3000),
})

export type Env = z.infer<typeof envSchema>

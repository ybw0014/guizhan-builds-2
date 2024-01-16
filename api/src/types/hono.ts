import { Context } from 'hono'

export type Environment = 'test' | 'dev' | 'staging' | 'production';

export type Env = {
	ENVIRONMENT: Environment;

	R2: R2Bucket;
}

export type Variables = {
	env: Environment;
}

export type Ctx = Context<{ Bindings: Env, Variables: Variables }>;

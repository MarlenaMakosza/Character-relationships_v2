import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z, ZodError } from 'zod';

const stringBoolean = z.coerce
  .string()
  .transform(value => value === 'true')
  .default('false');

const EnvironmentSchema = z.object({
  NODE_ENV: z.string().default('development'),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,
});

// export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

try {
  EnvironmentSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'Missing required values in .env:\n';
    for (const issue of error.issues) {
      message += `${issue.path[0]}\n`;
    }
    const error_ = new Error(message);
    error_.stack = '';
    throw error_;
  } else {
    console.error(error);
  }
}

export default EnvironmentSchema.parse(process.env);

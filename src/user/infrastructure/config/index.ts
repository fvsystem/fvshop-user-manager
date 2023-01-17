/* istanbul ignore file */
import { config as readEnv } from 'dotenv';
import { join } from 'path';
import { readFileSync } from 'node:fs';
import { z } from 'zod';

const envSchema = z.object({
  REST_PORT: z.coerce.number().optional(),
  NODE_ENV: z.string(),
  DB_VENDOR: z.string(),
  DB_HOST: z.string(),
  DB_LOGGING: z.coerce.boolean(),
  DB_PASSWORD: z.string().optional(),
  DB_PORT: z.coerce.number().optional(),
  DB_USERNAME: z.string().optional(),
  DOMAIN: z.string(),
  CREDENTIAL_DOMAIN: z.string(),
  CREDENTIAL_PORT: z.coerce.number(),
  GRPC_PORT: z.coerce.number().optional(),
});

export type ConfigShared = {
  nodeEnv: string;
  rest: {
    port?: number;
  };
  grpc: {
    port?: number;
  };
  domain: {
    domain: string;
  };
  credentialFacade: {
    domain: string;
    port: number;
  };
  db: {
    vendor: string;
    host: string;
    logging: boolean;
    password?: string;
    port?: number;
    username?: string;
  };
  jwt: {
    publicKey: string;
  };
};

export function makeConfigShared(envFile?: string): ConfigShared {
  if (process.env.NODE_ENV !== 'production') {
    readEnv({ path: envFile, override: true });
  }

  const env = envSchema.parse(process.env);

  const jwtPublicKey = readFileSync(join(process.cwd(), 'key.public'), 'utf8');

  return {
    nodeEnv: env.NODE_ENV,
    rest: {
      port: env.REST_PORT,
    },
    grpc: {
      port: env.GRPC_PORT,
    },
    domain: {
      domain: env.DOMAIN,
    },
    credentialFacade: {
      domain: env.CREDENTIAL_DOMAIN,
      port: env.CREDENTIAL_PORT,
    },
    db: {
      vendor: env.DB_VENDOR,
      host: env.DB_HOST,
      logging: env.DB_LOGGING,
      password: env.DB_PASSWORD,
      port: env.DB_PORT,
      username: env.DB_USERNAME,
    },
    jwt: {
      publicKey: jwtPublicKey,
    },
  };
}

// export const config = makeConfig(envFile);

export function getConfigTest(): ConfigShared {
  const envTestingFile = join(__dirname, '../../../../.env.test');
  return makeConfigShared(envTestingFile);
}

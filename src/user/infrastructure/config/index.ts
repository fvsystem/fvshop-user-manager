/* istanbul ignore file */
import { config as readEnv } from 'dotenv';
import { join } from 'path';

export type ConfigShared = {
  rest: {
    port?: number;
  };
  db: {
    vendor: any;
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

export function makeConfigShared(envFile): ConfigShared {
  const output = readEnv({ path: envFile });

  return {
    rest: {
      port: output.parsed.REST_PORT
        ? Number(output.parsed.REST_PORT)
        : undefined,
    },
    db: {
      vendor: output.parsed.DB_VENDOR as any,
      host: output.parsed.DB_HOST,
      logging: output.parsed.DB_LOGGING === 'true',
      password: output.parsed.DB_PASSWORD
        ? output.parsed.DB_PASSWORD
        : undefined,
      port: output.parsed.DB_PORT ? Number(output.parsed.DB_PORT) : undefined,
      username: output.parsed.DB_USERNAME
        ? output.parsed.DB_USERNAME
        : undefined,
    },
    jwt: {
      publicKey: output.parsed.JWT_PUBLIC_KEY,
    },
  };
}

// export const config = makeConfig(envFile);

export function getConfigTest(): ConfigShared {
  const envTestingFile = join(__dirname, '../../../../.env.test');
  return makeConfigShared(envTestingFile);
}

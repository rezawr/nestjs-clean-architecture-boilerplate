import { merge, set } from 'lodash';
import * as dotenv from 'dotenv';
import { plainToInstance } from 'class-transformer';
import { validateSync } from '@nestjs/class-validator';
import { RootConfig } from './root.config';

type RawConfig = { [s: string]: RawConfig | any };

const APP_NAME = 'APP_NAME' as const;
const ENV_PREFIX = `${APP_NAME}__` as const;
const ENV_DELIMITER = '__' as const;

function toCamelCase(str: string): string {
  return str.replace(/_./g, (match) => match[1].toUpperCase());
}

function loadEnvironment(env: Record<string, string | undefined>): RawConfig {
  return Object.keys(env)
    .filter((key) => key.startsWith(ENV_PREFIX))
    .map((k) => {
      const value = env[k];
      const keyWithoutPrefix = k.replace(ENV_PREFIX, '');
      const key = keyWithoutPrefix
        .split(ENV_DELIMITER)
        .map((x) => {
          const res = x.toLowerCase();
          return toCamelCase(res);
        })
        .join('.');

      return { key, value };
    })
    .reduce((a, { key, value }) => set(a, key, value), {});
}

export default () => {
  const configs = [];

  dotenv.config();

  const envConfig = loadEnvironment(process.env ?? {});
  configs.push(envConfig);

  const config = configs.reduce((a, b) => merge(a, b), {});

  const validatedConfig = plainToInstance(RootConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return { ...validatedConfig };
};

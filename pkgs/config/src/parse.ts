import Ajv from 'ajv';
import { LansaConfig } from './schema';

const ajv = new Ajv({
  strict: true,
  removeAdditional: 'all',
  logger: {
    error: console.error,
    log: console.log,
    warn: console.warn
  }
});

const validator = ajv.compile<LansaConfig>(LansaConfig);

/**
 * Applies defaults and validates the configuration.
 */
export function validateConfig(config: Record<string, unknown>): asserts config is LansaConfig {
  if (!validator(config)) {
    throw new Error(ajv.errorsText(validator.errors));
  }
}

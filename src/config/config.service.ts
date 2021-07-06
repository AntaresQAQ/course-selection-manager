import { AppConfig } from '@/config/config.schema';

import yaml from 'js-yaml';
import fs from 'fs-extra';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export class ConfigService {
  readonly config: AppConfig;

  constructor() {
    const filePath = process.env.COURSE_SELECTION_MANAGER_CONFIG;
    if (!filePath) {
      throw new Error(
        'Please specify configuration file with environment variable ' +
          'COURSE_SELECTION_MANAGER_CONFIG',
      );
    }

    const config = yaml.load(fs.readFileSync(filePath).toString());
    this.config = ConfigService.validateInput(config);
  }

  private static validateInput(inputConfig: unknown): AppConfig {
    const appConfig = plainToClass(AppConfig, inputConfig);
    const errors = validateSync(appConfig, {
      validationError: {
        target: false,
      },
    });
    if (errors.length > 0) {
      throw new Error(
        'Config validation error: ' + JSON.stringify(errors, null, 2),
      );
    }
    return appConfig;
  }
}

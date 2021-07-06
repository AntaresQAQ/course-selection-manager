import { IsIn, IsIP, IsString, ValidateNested } from 'class-validator';
import { IsPortNumber } from '@/common/validators';
import { Type } from 'class-transformer';

class ServerConfig {
  @IsIP()
  readonly hostname: string;

  @IsPortNumber()
  readonly port: string;
}

class DatabaseConfig {
  @IsIn(['mysql', 'mariadb'])
  readonly type: 'mysql' | 'mariadb';

  @IsString()
  readonly host: string;

  @IsPortNumber()
  readonly port: number;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly database: string;
}

export class AppConfig {
  @ValidateNested()
  @Type(() => ServerConfig)
  readonly server: ServerConfig;

  @ValidateNested()
  @Type(() => DatabaseConfig)
  readonly database: DatabaseConfig;

  @IsString()
  readonly redis: string;

  @IsString()
  readonly secret: string;
}

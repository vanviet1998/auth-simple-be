import { ROLES } from '@internal/shared/enum/user';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsEnum } from 'class-validator';

export enum PERMISSION {
  ROOT = 'ROOT',
}

type TokenMap<T extends JwtPayload> = {
  [K in TOKEN_TYPE]: ConstructorFunction<T>;
};

export enum TOKEN_TYPE {
  BASE = 'BASE',
}

export const TOKEN_MAP_ROLE: { [K in ROLES]: TOKEN_TYPE } = {
  [ROLES.ADMIN]: TOKEN_TYPE.BASE,
  [ROLES.USER]: TOKEN_TYPE.BASE,
};

@Exclude()
export abstract class JwtPayload {
  @Expose()
  @IsString()
  public userId!: string;

  @Expose()
  @IsEnum(ROLES)
  public roles!: ROLES;

  @Expose()
  @IsEnum(TOKEN_TYPE)
  public readonly type: TOKEN_TYPE = TOKEN_TYPE.BASE;

  @Expose()
  @IsEnum(PERMISSION, { each: true })
  public readonly permission: PERMISSION[] = [PERMISSION.ROOT];
}

class TokenTypeMap implements TokenMap<JwtPayload> {
  public [TOKEN_TYPE.BASE] = JwtPayload as ConstructorFunction<JwtPayload>;
}

export const TOKEN_TYPE_MAP = new TokenTypeMap();
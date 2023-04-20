import {
  JwtPayload,
  TOKEN_MAP_ROLE,
  TOKEN_TYPE,
  TOKEN_TYPE_MAP,
} from 'src/common/jwt/jwt-payload.dto';
import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

function extratToken<T extends JwtPayload>(
  tokenType: Constructor<T>,
  token: T,
): T {
  if (!tokenType) throw new InternalServerErrorException('Wrong token type');
  if (!token) throw new UnauthorizedException();
  const isSubTokenType =
    tokenType === TOKEN_TYPE_MAP[token.type as TOKEN_TYPE] ||
    tokenType.isPrototypeOf(token.type as TOKEN_TYPE);
  if (!isSubTokenType) {
    throw new InternalServerErrorException('Unexpected token type');
  }
  return token;
}

export const JWTContent = createParamDecorator(
  <T extends JwtPayload>(
    tokenType: Constructor<T>,
    ctx: ExecutionContext,
  ): T => {
    // custom typeToken with tokentype
    const request = ctx.switchToHttp().getRequest();
    // muss map type to ssssssssss
    request.user.type = TOKEN_MAP_ROLE[request.user.roles];
    return extratToken(tokenType, request.user);
  },
);

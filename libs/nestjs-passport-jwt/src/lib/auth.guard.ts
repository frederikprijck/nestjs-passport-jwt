/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  mixin,
  UnauthorizedException
} from '@nestjs/common';
import * as passport from 'passport';
import { AuthModuleOptions, Type } from './interfaces';
import { memoize } from './utils/memoize.util';

export type IAuthGuard = CanActivate & {
  logIn<TRequest extends { logIn: Function } = any>(
    request: TRequest
  ): Promise<void>;
  handleRequest<TUser = any>(err, user, info, context, status?): TUser;
};
export const AuthGuard: (
  role?: string | string[]
) => Type<IAuthGuard> = memoize(createAuthGuard);

function createAuthGuard(role?: string | string[]): Type<CanActivate> {
  class MixinAuthGuard<TUser = any> implements CanActivate {
    constructor(protected readonly options?: AuthModuleOptions) {
      console.log(options);
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const [request, response] = [
        this.getRequest(context),
        context.switchToHttp().getResponse()
      ];
      const passportFn = createPassportContext(request, response);
      const user = await passportFn(
        'jwt',
        {},
        (err, user, info, status) =>
          this.handleRequest(err, user, info, context, status)
      );
      
      request['user'] = user;

      const roles = user[this.options?.rolesClaimType || 'https://schemas.quickstarts.com/roles' || 'user'];
      console.log(roles);
      return role ? roles.includes(role) : true;
    }

    getRequest<T = any>(context: ExecutionContext): T {
      return context.switchToHttp().getRequest();
    }

    async logIn<TRequest extends { logIn: Function } = any>(
      request: TRequest
    ): Promise<void> {
      const user = request['user'];
      await new Promise<void>((resolve, reject) =>
        request.logIn(user, (err) => (err ? reject(err) : resolve()))
      );
    }

    handleRequest(err, user, info, context, status): TUser {
      console.log(user);
      if (err || !user) {
        throw err || new UnauthorizedException();
      }
      return user;
    }
  }

  return mixin(MixinAuthGuard);
}

const createPassportContext = (request, response) => (
  type,
  options,
  callback: Function
) =>
  new Promise<void>((resolve, reject) =>
    passport.authenticate(type, options, (err, user, info, status) => {
      try {
        request.authInfo = info;
        return resolve(callback(err, user, info, status));
      } catch (err) {
        reject(err);
      }
    })(request, response, (err) => (err ? reject(err) : resolve()))
  );
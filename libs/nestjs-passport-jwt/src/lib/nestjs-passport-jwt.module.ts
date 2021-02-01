import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthModuleOptions, IAuthModuleOptions } from './interfaces';

import { JwtStrategy } from './jwt.strategy';

export * from './auth.guard';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    JwtStrategy
  ],
  exports: [PassportModule]
})
export class PassportJwtModule {
  static register(options: IAuthModuleOptions): DynamicModule {
    console.log(options)
    return {
      module: PassportJwtModule,
      providers: [{ provide: AuthModuleOptions, useValue: options }],
      exports: [AuthModuleOptions]
    };
  }
}
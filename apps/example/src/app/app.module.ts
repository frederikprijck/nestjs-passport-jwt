import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassportJwtModule } from 'nestjs-passport-jwt';

@Module({
  imports: [PassportJwtModule.register({
    rolesClaimType: 'https://schemas.quickstarts.com/roles',
    audience: 'Test',
    domain: 'frdrkprck.eu.auth0.com'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

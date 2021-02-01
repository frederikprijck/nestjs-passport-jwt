import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { AuthModuleOptions } from './interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(protected readonly options?: AuthModuleOptions) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${options.domain}/.well-known/jwks.json`,
            }),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: options.audience,
            issuer: `https://${options.domain}/`,
        });
    }

    async validate(payload: any) {
        return payload;
    }
}
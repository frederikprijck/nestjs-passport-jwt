export interface Type<T = any> extends Function {
    new(...args: any[]): T;
}

export interface IAuthModuleOptions<T = any> {
    audience: string;
    domain: string;
    rolesClaimType?: string;
}

export class AuthModuleOptions implements IAuthModuleOptions {
    rolesClaimType?: string;
    audience: string;
    domain: string;
}
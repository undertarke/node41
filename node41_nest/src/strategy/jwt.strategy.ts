import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Bearer
// Authoriztion
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt") {

    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // jwtFromRequest: ExtractJwt.fromHeader("token"),

            ignoreExpiration: false,
            secretOrKey: "BI_MAT",
        });
    }


    async validate(tokenDecode: any) {


        return tokenDecode;
    }


}


// yarn add @nestjs/passport passport passport-local @nestjs/jwt passport-jwt  @types/passport-jwt

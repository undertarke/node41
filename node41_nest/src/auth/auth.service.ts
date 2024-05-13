import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    // yarn add @nestjs/jwt 

    constructor(private jwtService: JwtService) { }

    login(model) {
        let { email, password } = model

        // lỗi 400 => email hoặc pass sai
        // payload, (secret key, header)
        let token = this.jwtService.sign({ data: "abc" }, { expiresIn: "5d", algorithm: "HS256", secret: "BI_MAT" });
        return token;

    }

    signUp(model) {
        let { email, fullName, phone } = model;

        // lỗi 400 => email tồn tại
        return "OK"
    }

}

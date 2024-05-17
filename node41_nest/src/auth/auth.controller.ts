import { BadRequestException, Body, Controller, Headers, HttpCode, HttpException, HttpStatus, InternalServerErrorException, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(200)
  @Post("/login")
  login(@Body() body, @Headers("token") header) {

    try {

      return this.authService.login(body);

    } catch (exception) {
      
      if (exception.status != 500)
        throw new HttpException(exception.response, exception.status)
      
      //500
      throw new InternalServerErrorException("Lỗi ...")

    }


  }


  @Post("/sign-up")
  signUp(@Body() body) {



    return this.authService.signUp(body);

  }
}

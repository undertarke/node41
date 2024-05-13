import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/login")
  login(@Body() body, @Headers("token") header) {



    return this.authService.login(body);
  }


  @Post("/sign-up")
  signUp(@Body() body) {

    

    return this.authService.signUp(body);

  }
}

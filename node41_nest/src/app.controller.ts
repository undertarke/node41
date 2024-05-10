import { Body, Controller, Get, HttpCode, Param, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

type userType = {
  email: string,
  name: string
}

@Controller("/app")
export class AppController {

  constructor(private readonly appService: AppService) { }

  // enpoint: 
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // GET
  // endpoint: /app/demo
  @Get("/demo/:phone2")
  getDemo(@Req() req: Request,

    @Query("id2") id2: string,
    @Param("phone2") phone2: string,
    @Body() body: userType
  ) {

    // C2
    // query tring => ?id2

    // request

    // C1
    // query string =>  ?id
    let { id } = req.query;
    // query params
    let { phone } = req.params;


    // body

    let { email, name } = req.body;

    // response
    return "hello node 410000"
  }

  // tinh-tong/1/2  => 12 || 3
  @HttpCode(230)
  @Get("/tinh-tong/:so1/:so2")
  tinhTong(@Param("so1") so1: string, @Param("so2") so2: string): number {

    return this.appService.tinhTong(Number(so1), Number(so2))
  }


}

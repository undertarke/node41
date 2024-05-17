import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // module gốc
  app.enableCors() // enableCors({origin:["http://localhost:3000"]}),  orgin: "*"
  app.use(express.static(".")) // định vị thư mục load tài nguyên

  // yarn add @nestjs/swagger swagger-ui-express

  const config = new DocumentBuilder().setTitle("NestJS Swagger").addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/swagger", app, document);

  await app.listen(8080);
}
bootstrap();

// yarn start => node index.js
// yarn start:dev =>  nodemon , --watch

// đối tượng => đối tượng endpoint

// 3 module
// + module: liên kết controller và service của đối tượng đó, và có thể liên kết module của đối tượng khác
// + controller: Khởi tạo API
// + service: xử lý logic, tính toán, ....

// @: decorator
// anotation: Khai báo các decorator



// B1: yarn add prisma @prisma/client
// B2: yarn prisma init
// B3: update .env và provider của schema.prisma
// B4: yarn prisma db pull
// B5: yarn prisma generate


// yarn add @nestjs/config


// đối tượng authentication => auth
// API login, signup
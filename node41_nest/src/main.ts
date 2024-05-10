import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // module gốc

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
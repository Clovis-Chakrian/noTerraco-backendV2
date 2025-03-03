import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api/api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './buildingblocks/api/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  const config = new DocumentBuilder()
    .setTitle('No Terraço API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

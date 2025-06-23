import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDoc = new DocumentBuilder()
    .setTitle(' PI BACKEND - Ecommerce API')
    .setVersion('1.0')
    .setDescription('Esta es una API para mi proyecto del M4')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDoc);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes();
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

//generamos recursos con nest generate resource ___/___ --flat --no-spec

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

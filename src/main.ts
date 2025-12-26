import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

// I seperated the setup so we don't cram the bootstrap function
// This is the Swagger/Open Api setup as per the nest docs
// if you too lazy to manually add postman endpoints like me simply go to baseurl/api-json and copy paste :)
function setupSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Books Api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();

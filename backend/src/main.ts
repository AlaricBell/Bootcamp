import { NestFactory } from '@nestjs/core';
import { GithubModule } from './github/github.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GithubModule);
  app.setGlobalPrefix('api');

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey}_${methodKey}`,
  };
  const config = new DocumentBuilder()
    .setTitle('Bootcamp')
    .setDescription('The Tappointment bootcamp API solution')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: process.env.URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(process.env.PORT || 4000);
  console.log(`Server running on port ${process.env.PORT || 4000}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { GithubModule } from './repository/github.module';

async function bootstrap() {
  const app = await NestFactory.create(GithubModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();

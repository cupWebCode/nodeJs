import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(environment.api.prefix);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(environment.port);
}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import * as environment from './environments/environment';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  try {
    let env = environment[process.env.NODE_ENV] || environment['dev'];
    const app = await NestFactory.create(AppModule);
    const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

    app.useGlobalFilters(new AllExceptionsFilter(logger));
    app.enableCors();
    app.setGlobalPrefix(env.prefix);
    app.useLogger(logger);

    await app.listen(process.env.PORT || env.port).catch(e => {
      console.error(e);
    });
    console.info('APP HAS BEEN STARTED');
  } catch (e) {
    console.error(e);
  }
}

bootstrap();

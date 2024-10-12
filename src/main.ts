import { NestFactory } from '@nestjs/core';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { FallbackExceptionFilter } from './filters/fallback.filter';
import { HttpExceptionFilter } from './filters/http.filter';
import { ValidationException } from './filters/validation.exception';
import { ValidationFilter } from './filters/validation.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors();

  app.use(helmet());
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000;
  console.log('Listen PORT: ', port);
  console.log('With S3: ');

  await app.listen(port);

  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(
          (error) => `${error.property} has wrong value ${error.value},
                ${Object.values(error.constraints).join(', ')} `,
        );

        return new ValidationException(messages);
      },
    }),
  );
}
bootstrap();

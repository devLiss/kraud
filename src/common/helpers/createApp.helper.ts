import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../exception.filter';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { AppModule } from '../../app.module';
export const createAppHelper = (app: INestApplication): INestApplication => {
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const errorsForResp = [];
        errors.forEach((err) => {
          const keys = Object.keys(err.constraints);
          keys.forEach((k) => {
            errorsForResp.push({
              message: err.constraints[k],
              field: err.property,
            });
          });
        });
        throw new BadRequestException(errorsForResp);
      },
    }),
  );
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  return app;
};

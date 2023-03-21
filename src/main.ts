import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createAppHelper } from './common/helpers/createApp.helper';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app1 = await NestFactory.create(AppModule);
  const app = createAppHelper(app1);

  await app.listen(3000);
}
bootstrap();

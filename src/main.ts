import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createAppHelper } from './common/helpers/createApp.helper';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app1 = await NestFactory.create(AppModule);
  const app = createAppHelper(app1);
  const config = new DocumentBuilder()
    .setTitle('Kraud test task')
    .setDescription('')
    .setVersion('1.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

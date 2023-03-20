import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { AuthController } from './features/auth/auth.controller';
import { AuthModule } from './features/auth/auth.module';
import { CountryModule } from './features/country/country.module';

@Module({
  imports: [UserModule, AuthModule, CountryModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}

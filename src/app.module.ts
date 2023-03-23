import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { CityModule } from './features/city/city.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './features/user/user.entity';
import { City } from './features/city/city.entity';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { CitySeeder } from './city.seeder';

@Module({
  imports: [
    AuthModule,
    CityModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        models: [User, City],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    SeederModule.forRoot({
      runOnlyIfTableIsEmpty: true,
    }),
    SeederModule.forFeature([CitySeeder]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

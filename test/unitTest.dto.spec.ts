import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/features/dto/createUser.dto';
import { createAppHelper } from '../src/common/helpers/createApp.helper';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('Unit tests', () => {
  let app: INestApplication;
  let server: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app = createAppHelper(app);
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Check user create dto', () => {
    it('Should throw when password is null', async () => {
      const importInfo = {
        name: 'blabla',
        email: 'blabla@blabla.com',
        password: '',
      };
      const ofImportDto = plainToInstance(CreateUserDto, importInfo);
      const errors = await validate(ofImportDto);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain(
        `password must be longer than or equal to 8 characters`,
      );
    });

    it('Should throw when name is null', async () => {
      const importInfo = {
        name: 'qwe',
        email: '',
        password: '12345678',
      };
      const ofImportDto = plainToInstance(CreateUserDto, importInfo);
      const errors = await validate(ofImportDto);
      console.log(errors);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain(`email must be an email`);
    });

    it('Should throw when name is null', async () => {
      const importInfo = {
        name: '',
        email: 'blabla@gmail.com',
        password: '12345678',
      };
      const ofImportDto = plainToInstance(CreateUserDto, importInfo);
      const errors = await validate(ofImportDto);
      console.log(errors);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain(`name should not be empty`);
      expect(JSON.stringify(errors)).toContain(
        `name must be longer than or equal to 3 characters`,
      );
    });
  });
});

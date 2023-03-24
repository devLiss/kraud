import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/features/dto/createUser.dto';
import { createAppHelper } from '../src/common/helpers/createApp.helper';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginDto } from '../src/features/dto/login.dto';

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
        name: 'test_user',
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

    it('Should throw when email is null', async () => {
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

    it('Should throw when name length less then 3', async () => {
      const importInfo = {
        name: '23',
        email: 'blabla@gmail.com',
        password: '12345678',
      };
      const ofImportDto = plainToInstance(CreateUserDto, importInfo);
      const errors = await validate(ofImportDto);
      console.log(errors);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain(
        `name must be longer than or equal to 3 characters`,
      );
    });
    it('Should throw when name length more than 10', async () => {
      const importInfo = {
        name: '12345678905',
        email: 'blabla@gmail.com',
        password: '12345678',
      };
      const ofImportDto = plainToInstance(CreateUserDto, importInfo);
      const errors = await validate(ofImportDto);
      console.log(errors);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain(
        `name must be shorter than or equal to 10 characters`,
      );
    });

    it('Should throw when name is not string', async () => {
      const importInfo = {
        name: 54,
        email: 'blabla@gmail.com',
        password: '12345678',
      };
      const ofImportDto = plainToInstance(CreateUserDto, importInfo);
      const errors = await validate(ofImportDto);
      console.log(errors);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain(`name must be a string`);
    });
  });
  describe('Check loginDto', () => {
    it('Should throw when password doesnt exists', async () => {
      const importInfo = {
        email: 'blabla@blabla.com',
      };
      const ofImportDto = plainToInstance(LoginDto, importInfo);
      const errors = await validate(ofImportDto);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain(`password must be a string `);
    });
    it('Should throw when password less than 8 chars', async () => {
      const importInfo = {
        email: 'blabla@blabla.com',
        password: '45648',
      };
      const ofImportDto = plainToInstance(LoginDto, importInfo);
      const errors = await validate(ofImportDto);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain(
        `password must be longer than or equal to 8 characters`,
      );
    });
    it('Should throw when password more than 15 chars', async () => {
      const importInfo = {
        email: 'blabla@blabla.com',
        password: 'yuerwbjfewbjodghuwioqhwnrweji',
      };
      const ofImportDto = plainToInstance(LoginDto, importInfo);
      const errors = await validate(ofImportDto);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain(
        `password must be shorter than or equal to 15 characters`,
      );
    });
    it('Should throw when email doesnt exists', async () => {
      const importInfo = {
        password: 'yuerwb555',
      };
      const ofImportDto = plainToInstance(LoginDto, importInfo);
      const errors = await validate(ofImportDto);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain('email must be a string');
    });
    it("Should throw when email hasn't email format", async () => {
      const importInfo = {
        email: 'blabla',
        password: 'yuerwb555',
      };
      const ofImportDto = plainToInstance(LoginDto, importInfo);
      const errors = await validate(ofImportDto);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain(
        `/^[\\\\w-\\\\.]+@([\\\\w-]+\\\\.)+[\\\\w-]{2,4}$/ regular expression`,
      );
    });
  });
  describe('Check updateUserDto', () => {
    it('Should throw when birthDay is null', async () => {
      const importInfo = {
        name: 'Name',
        city: 'SomeCity',
        birthDay: '',
      };
      const ofImportDto = plainToInstance(LoginDto, importInfo);
      const errors = await validate(ofImportDto);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain(
        'birthDay must be a Date instance',
      );
    });
    it('Should throw when name is null', async () => {
      const importInfo = {
        name: '',
        city: 'SomeCity',
        birthDay: '2023-03-24T06:55:20.652Z',
      };
      const ofImportDto = plainToInstance(LoginDto, importInfo);
      const errors = await validate(ofImportDto);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain('name must be a string');
    });
    it('Should throw when city is not in list', async () => {
      const importInfo = {
        name: 'Name',
        city: 'SomeCity',
        birthDay: '2023-03-24T06:55:20.652Z',
      };
      const ofImportDto = plainToInstance(LoginDto, importInfo);
      const errors = await validate(ofImportDto);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain(
        'There is no selected city in list',
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/features/dto/createUser.dto';
import { createAppHelper } from '../src/common/helpers/createApp.helper';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('AppController (e2e)', () => {
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
    it('Should throw when ', async () => {
      const importInfo = { productCode: 4567, plannedQuanity: -10 };
      const ofImportDto = plainToInstance(CreateUserDto, importInfo);
      const errors = await validate(ofImportDto);
      expect(errors.length).not.toBe(0);
      expect(JSON.stringify(errors)).toContain(``);
    });
  });

  /*describe('Check registration ', () => {
    it('/auth/registration (POST) should return 400', async () => {
      const user: CreateUserDto = { name: '', email: '', password: '' };
      const res = await request(server).post('/auth/registration').send(user);
      expect(res.status).toBe(400);
    });
    it('/auth/registration (POST) should return 201 with user', async () => {
      const user: CreateUserDto = {
        name: '1234',
        email: 'qwe@aqews.com',
        password: '12345678',
      };
      const res = await request(server).post('/auth/registration').send(user);
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        id: expect.any(Number),
        name: user.name,
        email: user.email,
      });
      expect.setState({ user });
    });
    it('/auth/registration (POST) should return 400 if email exists', async () => {
      const user: CreateUserDto = {
        name: '343223ew',
        email: 'qwe@aqews.com',
        password: '123456dsew78',
      };
      const res = await request(server).post('/auth/registration').send(user);
      expect(res.status).toBe(400);
    });
  });
*/
  /*describe('Check login flow', () => {
    it('/auth/login should return 400', async () => {
      const res = await request(server)
        .post('/auth/login')
        .send({ email: '', password: '' });
      expect(res.status).toBe(400);
    });
    it('/auth/login should return 401', async () => {
      const user: CreateUserDto = {
        name: '1234',
        email: 'qwe@aqews.com',
        password: '12345678',
      };
      console.log('User ', user);
      const res = await request(server)
        .post('/auth/login')
        .send({ email: user.email, password: 'retqwyewqyuiqu' });
      expect(res.status).toBe(401);
    });
    it('/auth/login should return 200', async () => {
      const user: CreateUserDto = {
        name: '1234',
        email: 'qwe@aqews.com',
        password: '12345678',
      };
      console.log('User ', user);
      const res = await request(server).post('/auth/login').send(user);
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ accessToken: expect.any(String) });
    });
  });

  /*describe('Check update user', () => {
    it('/auth/login should return 200', async () => {
      const user: CreateUserDto = {
        name: '343223ew',
        email: 'qwe@aqews.com',
        password: '123456dsew78',
      };
      const accessToken = '';
      const res = await request(server).post('/auth/login').send(user);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ accessToken: expect.any(String) });
      expect.setState({ accessToken });
    });

    it('Should return 200 ', async () => {
      const { accessToken } = expect.getState();
      const res = await request(server)
        .put('/user')
        .auth(accessToken, { type: 'bearer' });

      expect(res.status).toBe(200);
      //expect(res.body).toBe
    });
  });

  /*describe('Check get all users flow', () => {});

  describe('Check get all cities', () => {});*/
  /*

  */
});

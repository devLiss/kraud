import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { CreateUserDto } from '../src/features/dto/createUser.dto';
import { createAppHelper } from '../src/common/helpers/createApp.helper';
import request from 'supertest';
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

  describe('Check registration ', () => {
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
      //expect.setState({ user });
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
  describe('Check login flow', () => {
    it('/auth/login should return 400', async () => {
      const res = await request(server)
        .post('/auth/login')
        .send({ email: '', password: '' });
      expect(res.status).toBe(400);
    });
    it('/auth/login should return 401', async () => {
      const user: CreateUserDto = {
        name: '1234',
        email: 'qwe111@aqews.com',
        password: '12544345678',
      };
      console.log('User ', user);
      const res = await request(server)
        .post('/auth/login')
        .send({ email: user.email, password: 'retqwyewqyuiqu' });
      expect(res.status).toBe(401);
    });
    it('/auth/login should return 201', async () => {
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

  describe('GET /user', () => {
    it('Should get all users return 401 if accessToken isnot defined ', async () => {
      const accessToken = '';
      const res = await request(server)
        .get('/user')
        .auth(accessToken, { type: 'bearer' });
      expect(res.status).toBe(401);
    });
    it('/auth/login should return 201', async () => {
      const user: CreateUserDto = {
        name: '1234',
        email: 'qwe@aqews.com',
        password: '12345678',
      };
      console.log('User ', user);
      const res = await request(server).post('/auth/login').send(user);
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ accessToken: expect.any(String) });
      expect.setState(res.body);
    });

    it('Should get all users return 200 ', async () => {
      const { accessToken } = expect.getState();
      const res = await request(server)
        .get('/user')
        .auth(accessToken, { type: 'bearer' });
      expect(res.status).toBe(200);
      //expect(res.body).toBe
    });
  });

  describe('PUT /user ', () => {
    it('Should return 401 if accessToken is not defined', async () => {
      const accessToken = '';
      const res = await request(server)
        .put('/user')
        .auth(accessToken, { type: 'bearer' })
        .send({});
      expect(res.status).toBe(401);
    });
    it('/auth/login should return 201', async () => {
      const user: CreateUserDto = {
        name: '1234',
        email: 'qwe@aqews.com',
        password: '12345678',
      };
      console.log('User ', user);
      const res = await request(server).post('/auth/login').send(user);
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ accessToken: expect.any(String) });
      expect.setState(res.body);
    });
    it('Should return 204 if update is successful', async () => {
      const { accessToken } = expect.getState();
      const updatedData = {
        name: 'updName',
        birthDay: '2023-03-24',
      };
      const res = await request(server)
        .put('/user')
        .auth(accessToken, { type: 'bearer' })
        .send(updatedData);
      expect(res.status).toBe(204);
    });
  });

  describe('Check get all cities', () => {
    it('Should get all cities return 401 if accessToken isnot defined ', async () => {
      const accessToken = '';
      const res = await request(server)
        .get('/city')
        .auth(accessToken, { type: 'bearer' });
      expect(res.status).toBe(401);
    });
    it('/auth/login should return 201', async () => {
      const user: CreateUserDto = {
        name: '1234',
        email: 'qwe@aqews.com',
        password: '12345678',
      };
      console.log('User ', user);
      const res = await request(server).post('/auth/login').send(user);
      expect(res.status).toBe(201);
      expect(res.body).toEqual({ accessToken: expect.any(String) });
      expect.setState(res.body);
    });

    it('Should get all users return 200 ', async () => {
      const { accessToken } = expect.getState();
      const res = await request(server)
        .get('/city')
        .auth(accessToken, { type: 'bearer' });
      expect(res.status).toBe(200);
    });
  });
});

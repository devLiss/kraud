import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/features/dto/createUser.dto';
import { createAppHelper } from '../src/common/helpers/createApp.helper';
import { LoginDto } from '../src/features/dto/login.dto';

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

  it('/user (GET)', async () => {
    const res = await request(server).get('/user');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });

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
    //expect.setState({ user });
  });
  it('/user after registr (GET)', async () => {
    const res = await request(server).get('/user');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  /*
  it('/auth/login should return 400', async () => {
    const res = await request(server).post('/auth/login').send({});
    expect(res.status).toBe(400);
  });
  it('/auth/login should return 401', async () => {
    const { user } = expect.getState();
    const res = await request(server)
      .post('/auth/login')
      .send({ email: user.email, password: 'retqwyewqyuiqu' });
    expect(res.status).toBe(401);
  });
  it('/auth/login should return 200', async () => {
    const { user } = expect.getState();
    const res = await request(server).post('/auth/login').send(user);
    expect(res.status).toBe(200);
  });
  */
});

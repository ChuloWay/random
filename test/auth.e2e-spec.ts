import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ServiceUnavailableException } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {

    const email = 'test@demo2.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: email,
        password: 'qwerty'
      })
      .expect(201)
      .then((res)=> {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email)
      })
  });

  it('signup as new user and get currently logged in user', async ()=> {

    const email = 'demo@test.com';

    const res = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({ email, password: 'zxcv'})
        .expect(201)

        const cookie = res.get('Set-Cookie');

        const { body } = await request(app.getHttpServer())
        .get('/auth/whoami')
        .set('Cookie', cookie)
        .expect(200)

        expect(body.email).toEqual(email);
  });

});

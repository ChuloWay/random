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

});

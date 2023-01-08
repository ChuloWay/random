import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { UserEntity } from './users/users.entity';
import { ReportEntity } from './reports/reports.entity';
const cookieSession = require('cookie-session');
const ormconfig = require('../ormconfig.js')


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot(ormconfig)
    ,
    UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true
    })
  }],
})
export class AppModule {
  constructor(
    private configService: ConfigService
  ) { }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        keys: [this.configService.get('COOKIE_KEY')]
      })
    ).forRoutes('*');
  }
}

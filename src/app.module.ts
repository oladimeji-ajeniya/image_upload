import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { DatabaseModule } from './core/database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImageUploadModule } from './modules/image-upload/image-upload.module';
import { CustomLogger } from './custom-logger/custom-logger.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as any,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as any,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME_TEST,
      autoLoadModels: true,
      synchronize: false,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    DatabaseModule,
    ImageUploadModule,
],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'LoggerService',
      useClass: CustomLogger,
    },
  ],
})
export class AppModule {

}
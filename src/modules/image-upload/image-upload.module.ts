import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImageUploadService } from './image-upload.service';
import { ImageUploadController } from './image-upload.controller';
import { Image } from './entities/image.entity';

@Module({
  imports: [SequelizeModule.forFeature([Image])],
  controllers: [ImageUploadController],
  providers: [ImageUploadService],
})
export class ImageUploadModule {}

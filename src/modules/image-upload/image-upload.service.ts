import { Injectable, BadRequestException } from '@nestjs/common';
import * as sharp from 'sharp';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './entities/image.entity';
import * as cloudinary from 'cloudinary';
import * as dotenv from 'dotenv';
import * as AWS from 'aws-sdk';

dotenv.config();

@Injectable()
export class ImageUploadService {
  private readonly s3: AWS.S3;

  constructor(
    @InjectModel(Image)
    private imageModel: typeof Image,
  ) {
    // Cloudinary configuration
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // AWS S3 configuration
    this.s3 = new AWS.S3({
      region: process.env.AWS_DEV_REGION,
      accessKeyId: process.env.AWS_S3_ACCESS,
      secretAccessKey: process.env.AWS_S3_SECRET,
    });
  }

  // Updated to handle multiple image uploads
  async processAndStoreImages(files: Express.Multer.File[], uploadType: 'cloudinary' | 's3'): Promise<any[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const uploadResults = [];

    try {
      for (const file of files) {
        const fileName = `${uuidv4()}.jpeg`;

        // Process the image: Resize, crop, and convert to JPEG
        const imageBuffer = await sharp(file.buffer)
          .resize(800, 800, {
            fit: sharp.fit.cover,
          })
          .toFormat('jpeg')
          .toBuffer();

        let uploadResult;
        let imageUrl;

        if (uploadType === 'cloudinary') {
          uploadResult = await this.uploadToCloudinary(imageBuffer, {
            folder: 'uploads',
            use_filename: true,
            filename_override: fileName,
          });
          imageUrl = uploadResult.secure_url;
        } else if (uploadType === 's3') {
          uploadResult = await this.uploadToS3(imageBuffer, fileName);
          imageUrl = uploadResult.Location;
        }

        // Store the image in the database
        await this.storeImage(fileName, imageUrl, imageBuffer.length);
        uploadResults.push({ fileName, imageUrl });
      }

      return uploadResults;

    } catch (error) {
      console.error('Error processing and storing images:', error);
      throw new Error('Failed to process and store images');
    }
  }

  private async uploadToCloudinary(buffer: Buffer, options: object): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }).end(buffer);
    });
  }

  private async uploadToS3(buffer: Buffer, fileName: string): Promise<any> {
    const uploadParams = {
      Bucket: process.env.AWS_DEV_BUCKET,
      Body: buffer,
      Key: fileName,
    };

    return this.s3.upload(uploadParams).promise();
  }

  private async storeImage(fileName: string, url: string, size: number): Promise<Image> {
    return await this.imageModel.create({
      fileName,
      url,
      size,
    });
  }
}

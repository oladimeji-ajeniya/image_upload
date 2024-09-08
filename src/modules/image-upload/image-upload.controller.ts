import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from './image-upload.service';
import { ApiConsumes, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Images')
@Controller('images')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  /**
   * Uploads multiple images and processes them according to the specified upload type.
   * Supports three types of uploads: 'cloudinary' or 's3'.
   * 
   * @param files The uploaded image files.
   * @param uploadType The storage type: 'cloudinary' or 's3'.
   * @returns A success message with image links or an error.
   */
  @Post('upload')
  @ApiOperation({ summary: 'Upload multiple images to cloudinary or s3 storage' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'type',
    required: true,
    description: 'Upload type. Choose between "cloudinary" or "s3".',
    enum: ['cloudinary', 's3'],
  })
  @ApiBody({
    description: 'Image files to be uploaded',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Images uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid upload type or file type' })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: {
        fileSize: 3 * 1024 * 1024, // 2MB limit per file
      },
      fileFilter: (req, file, cb) => {
        // Ensure that only image files are allowed
        if (!file.mimetype.startsWith('image/')) {
          return cb(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('type') uploadType: string,
  ) {
    try {
      if (!['cloudinary', 's3'].includes(uploadType)) {
        throw new BadRequestException(
          'Invalid upload type. Use "cloudinary" or "s3".',
        );
      }

      if (!files || files.length === 0) {
        throw new BadRequestException('No files were uploaded.');
      }

      const results = await this.imageUploadService.processAndStoreImages(
        files,
        uploadType as 'cloudinary' | 's3',
      );

      // Prepare success message
      const successMessage = {
        message: 'Images uploaded successfully',
        images: results.map(result => ({
          fileName: result.fileName,
          url: result.imageUrl,
        })),
      };

      return successMessage;

    } catch (error) {
      throw new BadRequestException(
        error.message || 'An error occurred while uploading the images.',
      );
    }
  }
}

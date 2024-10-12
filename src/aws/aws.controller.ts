import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AwsService } from './aws.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload-image')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() request,
    @Res() response,
  ) {
    try {
      return await this.awsService.uploadFile(file.buffer, file.originalname);
    } catch (error) {
      return response
        .status(500)
        .json('Failed to upload image file' + error.message);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  constructor(private configService: ConfigService) {}
  bucketName = this.configService.get('AWS_BUCKET_NAME');

  s3 = new S3({
    accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
  });

  async uploadFile(dataBuffer: Buffer, fileName: string) {
    console.log('bucketname', this.bucketName);
    const params = {
      Bucket: this.bucketName,
      Key: fileName, // nombre del archivo en S3
      Body: dataBuffer, // el archivo a subir (puede ser un buffer)
    };

    try {
      console.error('dataBuffer:', dataBuffer);
      console.error('fileName:', fileName);
      const data = await this.s3.upload(params).promise();

      console.log(`File uploaded successfully at ${data.Location}`);
      return data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
}

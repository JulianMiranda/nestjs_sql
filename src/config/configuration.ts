export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url:
      process.env.DATABASE_URL ||
      'mysql://root:tyto_14808@localhost:3306/nestsql',
  },
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
  hello: process.env.HELLO || 'Hello',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  awsRegion: process.env.AWS_REGION || '',
  awsBucketName: process.env.AWS_BUCKET_NAME || '',
});

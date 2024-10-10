export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url:
      process.env.DATABASE_URL ||
      'mysql://root:tyto_14808@localhost:3306/mydatabase',
  },
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
});

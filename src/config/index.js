import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  dbConnect: process.env.DB_CONNECT,
  jwtToken: process.env.JWT_TOKEN_SECRET
};

export default config;

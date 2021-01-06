require('dotenv').config();
const secrets = {
  port: process.env.PORT,
  jwt: process.env.JWT_KEY,
  domain: process.env.DOMAIN,
  mongo: process.env.MONGODB_URI,
};
export default secrets;

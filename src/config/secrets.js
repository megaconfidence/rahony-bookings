require('dotenv').config();
const secrets = {
  port: process.env.PORT,
  jwt: process.env.JWT_KEY,
  mongo: process.env.MONGODB_URI,
  postmarkToken: process.env.POSTMARK_SERVER_TOKEN,
};
export default secrets;

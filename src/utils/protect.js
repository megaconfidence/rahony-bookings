import {secrets} from '../config';
import User from '../resources/user/model';
import jwt from 'jsonwebtoken';

const newToken = (user) => {
  return jwt.sign({id: user._id}, secrets.jwt);
};
const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
const protect = async (req, res, next) => {
  const notAuth = {message: 'unauthorized', error: 'unauthorized'};
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).send(notAuth);
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).send(notAuth);
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).send(notAuth);
  }
  req.user = user;
  next();
};

export {newToken, verifyToken, protect};

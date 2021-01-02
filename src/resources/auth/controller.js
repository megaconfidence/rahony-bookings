import bcrypt from 'bcrypt';
import User from '../user/model';
import {newToken} from '../../utils';

const validateUser = async ({email, phone}) => {
  return {
    phone: Boolean(await User.findOne({phone}).lean().exec()),
    email: Boolean(await User.findOne({email}).lean().exec()),
  };
};

export const signin = async (req, res) => {
  const {password, signinkey} = req.body;
  const signinvalue = req.body[signinkey];

  const user = await User.findOne({[signinkey]: signinvalue})
    .lean()
    .exec();
  const doPasswordMatch = await bcrypt.compare(password, user?.password || '');

  if (!user || !doPasswordMatch) {
    return res.status(400).send({
      message: 'sign in failed',
      error: 'wrong phone number or password',
    });
  }
  const token = newToken(user);

  delete user.password;
  return res.send({
    message: 'sign in successful',
    data: {token, user},
  });
};

export const signup = async (req, res) => {
  const {firstname, lastname, email, phone, password} = req.body;

  const validation = await validateUser({email, phone});

  for (const item in validation) {
    if (validation[item]) {
      return res.status(400).send({
        message: 'registration failed',
        error: `${item} is already being used, please try a new ${item}`,
      });
    }
  }

  const newUser = await User.create({
    email,
    phone,
    lastname,
    firstname,
    password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
  });

  const user = newUser.toJSON();
  delete user.password;
  const token = newToken(user);

  return res.send({
    message: 'sign up successful',
    data: {token, user},
  });
};

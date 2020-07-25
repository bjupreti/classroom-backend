import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../resources/user/user.model';
import { authValidation } from './validation';
import config from '../config';

const createToken = (payload) => {
  return jwt.sign(payload, config.jwtToken);
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtToken, (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  // validation
  const { error } = authValidation(req.body);
  if (error) {
    return res.status(422).send({ message: error.details[0].message });
  }

  // checking if the user already exists in our database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send({ message: 'Email already exists' });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const user = await User.create({ ...req.body, password: hashedPassword });

    // creating and assigning JWT token
    const token = createToken({ _id: user._id });
    return res.status(201).send({ token });
  } catch (e) {
    return res.status(400).send(e);
  }
};

export const signin = async (req, res) => {
  // validation
  const { error } = authValidation(req.body);
  if (error) {
    return res.status(422).send({ message: error.details[0].message });
  }

  const invalid = { message: 'Invalid email and password combination' };

  try {
    const user = await User.findOne({ email: req.body.email })
      .select('email password')
      .lean()
      .exec();

    // checking if the email exists
    if (!user) {
      return res.status(401).send(invalid);
    }

    // checking if password is correct
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    // creating and assigning JWT token
    const token = createToken({ _id: user._id });
    return res.status(200).send({ token });
  } catch (e) {
    return res.status(500).end();
  }
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }

  const token = bearer.split(' ')[1];

  // verifying the JWT token
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = User.findById(payload._id).select('-password').lean().exec();

  if (!user) {
    return res.status(401).end();
  }

  // appending the user in request and going to next middleware
  req.user = user;
  next();
};

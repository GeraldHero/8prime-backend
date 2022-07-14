import jwt from 'jsonwebtoken';
import Users from '../model/Users.js';

export default async function (req, res, next) {
  try {
    const token = await req.header('Authorization').replace('Bearer ', '');

    if (!token) throw new Error();
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await Users.findOne({
      _id: decode.id,
      'tokens.token': token,
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ msg: 'Not authorized!' });
  }
}

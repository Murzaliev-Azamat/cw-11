import express from 'express';
import User from '../models/User';
import {Error} from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      phoneNumber: req.body.phoneNumber
    });

    user.generateToken();
    await user.save();
    return res.send({message: 'Registered successfully!', user});
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});


usersRouter.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(400).send({error: 'Username or password incorrect'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Username or password incorrect'});
  }

  user.generateToken();
  await user.save();

  return res.send({message: 'Username and password correct!', user});
});


usersRouter.post('/secret', auth, async (req, res) => {
  const user = (req as RequestWithUser).user;

  return res.send({
    message: 'Secret message',
    username: user.username
  });
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = {message: 'OK'}

    if (!token) {
      return res.send(success);
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.send(success);
    }

    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
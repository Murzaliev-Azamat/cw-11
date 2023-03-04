import express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import {OneNewsMutation} from "../types";
import OneNews from "../models/OneNews";
import auth, {RequestWithUser} from "../middleware/auth";

const newsRouter = express.Router();

newsRouter.get('/', async (req, res, next) => {
  try {
    const news = await OneNews.find().sort({date: -1});
    return res.send(news);
  } catch (e) {
    return next(e);
  }
});

newsRouter.get('/:id', async (req, res, next) => {
  try {
    const oneNews = await OneNews.findById(req.params.id);
    return res.send(oneNews);
  } catch (e) {
    return next(e);
  }
});

newsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  const oneNewsData: OneNewsMutation = {
    author: user._id,
    title: req.body.title,
    date: new Date(),
    image: req.file ? req.file.filename : null,
    description: req.body.description,
  };

  const oneNews = new OneNews(oneNewsData);

  try {
    await oneNews.save();
    return res.send(oneNews);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default newsRouter;
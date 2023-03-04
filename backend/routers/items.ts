import express, {query} from "express";
import mongoose, {Schema, Types} from "mongoose";
import {imagesUpload} from "../multer";
import {ItemMutation} from "../types";
import Item from "../models/Item";
import auth, {RequestWithUser} from "../middleware/auth";

const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res, next) => {
  // const categoryId = ObjectId(req.query.category)

  try {
    if (req.query.category) {
      const items = await Item.find({category: req.query.category});
      return res.send(items);
    }
    const items = await Item.find();
    return res.send(items);
  } catch (e) {
    return next(e);
  }
});

// itemsRouter.get('/:id', async (req, res, next) => {
//   try {
//     const oneNews = await Item.findById(req.params.id);
//     return res.send(oneNews);
//   } catch (e) {
//     return next(e);
//   }
// });

itemsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  const itemData: ItemMutation = {
    author: user._id,
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.file ? req.file.filename : null,
  };

  const item = new Item(itemData);

  try {
    await item.save();
    return res.send(item);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default itemsRouter;
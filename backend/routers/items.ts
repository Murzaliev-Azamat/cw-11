import express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import {ItemMutation} from "../types";
import Item from "../models/Item";
import auth, {RequestWithUser} from "../middleware/auth";

const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res, next) => {
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


itemsRouter.delete('/:id', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    const item = await Item.findOne({author: user._id, _id: req.params.id});
    if (item) {
      await Item.deleteOne({author: item.author, _id: item._id});
      return res.send("Item deleted");
    } else {
      return res.status(403).send("Нельзя удалить чужой продукт");
    }
  } catch (e) {
    return next(e);
  }
});

export default itemsRouter;
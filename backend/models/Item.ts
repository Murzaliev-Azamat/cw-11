import mongoose, {HydratedDocument, Types} from 'mongoose';
import {ItemMutation} from "../types";
import User from "./User";
import Category from "./Category";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist'
    }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Category.findById(value),
      message: 'Category does not exist'
    }
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<ItemMutation>, description: string) {
        if (!this.image && !description) {
          return false
        }
      },
      message: 'Description or image does not exist',
    },
  },
  image: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<ItemMutation>, image: string) {
        if (!this.description && !image) {
          return false
        }
      },
      message: 'Description or image does not exist',
    },
  },
});

const Item = mongoose.model('Item', ItemSchema);
export default Item;









import mongoose, {HydratedDocument} from 'mongoose';
import {OneNewsMutation} from "../types";

const Schema = mongoose.Schema;

const OneNewsSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<OneNewsMutation>, description: string) {
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
      validator: function (this: HydratedDocument<OneNewsMutation>, image: string) {
        if (!this.description && !image) {
          return false
        }
      },
      message: 'Description or image does not exist',
    },
  },
  date: {
    type: Date,
    required: true
  },
});

const OneNews = mongoose.model('OneNews', OneNewsSchema);
export default OneNews;









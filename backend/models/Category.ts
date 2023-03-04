import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: async (value: string) => {
        const category = await Category.find({title: value})
        if (category.length > 0) {
          return false
        }
      },
      message: 'Category already exist'
    }
  },
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;









import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Item from "./models/Item";
import Category from "./models/Category";

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('categories');
    await db.dropCollection('items');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [azamat, adilet] = await User.create(
    {
      username: "Azamat",
      password: "12345",
      displayName: "Display name Azamat",
      phoneNumber: "0555000000",
      token: crypto.randomUUID()
    },
    {
      username: "Adilet",
      password: "333",
      displayName: "Display name Adilet",
      phoneNumber: "0555111111",
      token: crypto.randomUUID()
    }
  );

  const [cars, computers, clothing] = await Category.create(
    {
      title: "Cars",
    },
    {
      title: "Computers",
    },
    {
      title: "Clothing",
    }
  );

  await Item.create(
    {
      author: azamat._id,
      category: cars._id,
      title: "Audi",
      description: "Description about about audi",
      price: 100,
      image: "fixtures/audi.jpg",
    },
    {
      author: azamat._id,
      category: computers._id,
      title: "Lenovo",
      description: "Description about about lenovo",
      price: 200,
      image: "fixtures/lenovo.jpg",
    },
    {
      author: azamat._id,
      category: clothing._id,
      title: "Pants",
      description: "Description about about pants",
      price: 300,
      image: "fixtures/pants.jpg",
    },
    {
      author: adilet._id,
      category: cars._id,
      title: "Lexus",
      description: "Description about about lexus",
      price: 400,
      image: "fixtures/lexus.jpg",
    },
    {
      author: adilet._id,
      category: computers._id,
      title: "HP",
      description: "Description about about hp",
      price: 500,
      image: "fixtures/hp.jpg",
    },
    {
      author: adilet._id,
      category: clothing._id,
      title: "Dress",
      description: "Description about about dress",
      price: 600,
      image: "fixtures/dress.jpg",
    },
  );

  await db.close();
};

void run();
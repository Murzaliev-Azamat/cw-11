import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import usersRouter from "./routers/users";
import config from "./config";
import itemsRouter from "./routers/items";
import categoriesRouter from "./routers/categories";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
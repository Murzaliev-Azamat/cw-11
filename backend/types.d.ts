export interface OneNewsMutation {
  author: ObjectId;
  title: string;
  description: string;
  image: string | null;
  date: Date;
}

export interface CommentMutation {
  author: ObjectId;
  oneNews: ObjectId;
  message: string;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
}
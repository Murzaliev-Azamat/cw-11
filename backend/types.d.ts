export interface ItemMutation {
  author: ObjectId;
  category: ObjectId;
  title: string;
  description: string;
  price: number;
  image: string | null;
}

export interface IUser {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}
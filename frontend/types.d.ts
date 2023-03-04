export interface Artist {
  _id: string;
  name: string;
  image: string;
  info: string;
}

export interface Album {
  _id: string;
  artist: {
    _id: string;
    name: string;
    image: string;
    info: string;
  }
  name: string;
  year: string;
  image: string;
}

export interface Track {
  _id: string;
  album: {
    _id: string;
    artist: {
      _id: string;
      name: string;
      image: string;
      info: string;
    }
    name: string;
    year: string;
    image: string;
  }
  name: string;
  time: string;
  trackNumber: number;
  linkToYoutube?: string;
}

export interface TrackHistory {
  _id: string;
  track: {
    _id: string;
    album: {
      _id: string;
      artist: {
        _id: string;
        name: string;
        info: string;
        image: string;
      }
        image: string;
        name: string;
        year: number;
    }
    name: string;
    time: string;
    trackNumber: number;
  }
  user: string;
  datetime: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _name: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}







export interface OneNews {
  _id: number;
  title: string;
  description: string;
  image: string | null;
  date: string;
}

export interface OneNewsApi {
  title: string;
  description: string;
  image: File | null;
}

export interface Comment {
  _id: number;
  author: {
    _id: string;
    username: string;
  }
  oneNews: string;
  message: string;
}

export interface CommentApi {
  oneNews: string | undefined;
  // author: string;
  message: string;
}
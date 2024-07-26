export interface BookObj {
  id: string;
  _id?: string;
  title: string;
  genre: string;
  averageRating?: number;
  author: {
    name: string;
    _id: string;
  };
  synopsis: string;
  coverUrl: string;
  likes?: string[];
  reader?: string[];
  numOfChapter: number;
  ratings?: RateObj[];
  isFeatured?: boolean;
}

export interface SingleBookObj {
  _id?: string;
  title: string;
  genre: string;
  author: AuthorObj;
  synopsis: string;
  coverUrl: string;
  likes?: string[];
  reader?: string[];
  numOfChapter: number;
  rating?: { user?: string; rating?: number }[];
  isFeatured?: boolean;
  authorsBooks?: BookObj[];
}

export interface RateObj {
  _id: string;
  user: string;
  book: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

export interface RateObjII {
  _id: string;
  user: { fullName: string; coverUrl: string; _id: string };
  book: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthorObj {
  _id: string;
  name: string;
  bio: string;
  coverUrl?: string;
  books?: BookObj[];
}

export interface UserDetailObj {
  _id: string;
  email: string;
  fullName: string;
  coverUrl?: string;
}

export interface BookObj {
  id: string;
  _id?: string;
  title: string;
  genre: string;
  author: string;
  synopsis: string;
  coverUrl: string;
  likes?: string[];
  reader?: string[];
  numOfChapter: number;
  rating?: { user?: string; rating?: number }[];
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

export interface AuthorObj {
  _id: string;
  name: string;
  bio: string;
  coverUrl?: string;
  publications?: string[];
}

export interface UserDetailObj {
  _id: string;
  email: string;
  fullName: string;
  coverUrl?: string;
}

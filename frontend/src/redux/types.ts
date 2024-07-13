export interface BookObj {
  id: string;
  title: string;
  genre: string;
  author: string;
  synopsis: string;
  coverUrl: string;
  likes?: string;
  reads?: number;
  numOfChapter: number;
  rating?: number;
  isFeatured?: boolean;
}

export interface AuthorObj {
  id: string;
  name: string;
  coverUrl?: string;
  publications: string[];
}

export interface UserDetailObj {
  firstname: "";
  lastname: "";
  username: "";
  coverUrl: "";
}

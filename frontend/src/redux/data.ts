import { AuthorObj, BookObj } from "./types";

export const Books: BookObj[] = [
  {
    id: "1",
    title: "Diary of a CEO",
    author: "steven bartlett",
    coverUrl: "",
    genre: "business",
    numOfChapter: 20,
    isFeatured: true,
    rating: 4,
    synopsis:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia praesentium accusamus numquam error inventore ullam consequatur eius. Corrupti laudantium at, tempora reprehenderit ab fugit quidem libero ut expedita quisquam nam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia praesentium accusamus numquam error inventore ullam consequatur eius. Corrupti laudantium at, tempora reprehenderit ab fugit quidem libero ut expedita quisquam nam.",
  },
  {
    id: "2",
    title: "Diary of a CEO",
    author: "steven bartlett",
    coverUrl: "https://nigeriannewsleader.com/images/the_diary_of_a_ceo.jpg",
    genre: "business",
    numOfChapter: 20,
    isFeatured: true,
    rating: 4,
    synopsis:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia praesentium accusamus numquam error inventore ullam consequatur eius. Corrupti laudantium at, tempora reprehenderit ab fugit quidem libero ut expedita quisquam nam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia praesentium accusamus numquam error inventore ullam consequatur eius. Corrupti laudantium at, tempora reprehenderit ab fugit quidem libero ut expedita quisquam nam.",
  },
  {
    id: "3",
    title: "Diary of a CEO",
    author: "steven bartlett",
    coverUrl: "",
    genre: "business",
    numOfChapter: 20,
    rating: 3,
    synopsis:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia praesentium accusamus numquam error inventore ullam consequatur eius. Corrupti laudantium at, tempora reprehenderit ab fugit quidem libero ut expedita quisquam nam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia praesentium accusamus numquam error inventore ullam consequatur eius. Corrupti laudantium at, tempora reprehenderit ab fugit quidem libero ut expedita quisquam nam.",
  },
  {
    id: "4",
    title: "Diary of a CEO",
    author: "steven bartlett",
    coverUrl: "https://nigeriannewsleader.com/images/the_diary_of_a_ceo.jpg",
    genre: "business",
    numOfChapter: 20,
    rating: 2,
    synopsis:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia praesentium accusamus numquam error inventore ullam consequatur eius. Corrupti laudantium at, tempora reprehenderit ab fugit quidem libero ut expedita quisquam nam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia praesentium accusamus numquam error inventore ullam consequatur eius. Corrupti laudantium at, tempora reprehenderit ab fugit quidem libero ut expedita quisquam nam.",
  },
  {
    id: "5",
    title: "Diary of a CEO",
    author: "steven bartlett",
    coverUrl: "",
    genre: "business",
    numOfChapter: 20,
    synopsis:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia praesentium accusamus numquam error inventore ullam consequatur eius. Corrupti laudantium at, tempora reprehenderit ab fugit quidem libero ut expedita quisquam nam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia praesentium accusamus numquam error inventore ullam consequatur eius. Corrupti laudantium at, tempora reprehenderit ab fugit quidem libero ut expedita quisquam nam.",
  },
];

export const authors: AuthorObj[] = [
  {
    id: "1",
    name: "steven bartlett",
    publications: ["1", "3", "4"],
  },
  {
    id: "2",
    name: "steven bartlett",
    publications: ["1", "3", "4"],
  },
  {
    id: "3",
    name: "steven bartlett",
    publications: ["1", "3", "4"],
  },
  {
    id: "4",
    name: "steven bartlett",
    publications: ["1", "3", "4"],
  },
  {
    id: "5",
    name: "steven bartlett",
    publications: ["1", "3", "4"],
  },
];

export const MyFaves = ["1", "4", "3"];
export const MyReadingList = ["1", "4", "3"];

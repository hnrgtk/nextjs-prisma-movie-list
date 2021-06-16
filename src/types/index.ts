import { Movie } from "@prisma/client";

export type InputProps = {
  title: string;
  rating: string;
  genre: string;
  listId: string;
};

export type ListModel = {
  id: string;
  name: string;
  movies: Movie[];
};

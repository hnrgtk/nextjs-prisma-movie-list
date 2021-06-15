import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Erro: Método não permitido!" });
  }

  const parsedData = JSON.parse(req.body);

  const addMovieOnList = await prisma.list.update({
    where: {
      id: JSON.parse(req.body).listId,
    },
    data: {
      movies: {
        create: {
          title: parsedData.title,
          genre: parsedData.genre,
        },
      },
    },
    select: {
      movies: true,
    },
  });

  res.json(addMovieOnList);
};

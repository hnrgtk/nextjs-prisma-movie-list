import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Erro: Método não permitido!" });
  }

  const parsedData = JSON.parse(req.body);

  const changeWatchedStatus = await prisma.list.update({
    where: {
      id: parsedData.listId,
    },
    data: {
      movies: {
        update: {
          where: {
            id: parsedData.movieId,
          },
          data: {
            watched: parsedData.watched,
          },
        },
      },
    },
    select: {
      movies: true,
    },
  });

  res.json(changeWatchedStatus);
};

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Erro: Método não permitido!" });
  }

  const parsedData = JSON.parse(req.body);

  const removedList = await prisma.list.delete({
    where: {
      id: parsedData.listId,
    },
    include: {
      movies: true,
    },
  });

  res.json(removedList);
};

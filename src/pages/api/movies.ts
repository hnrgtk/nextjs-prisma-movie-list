import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Erro: Método não permitido!" });
  }
  const createdMovie = await prisma.movie.create({
    data: JSON.parse(req.body),
  });

  res.json(createdMovie);
};

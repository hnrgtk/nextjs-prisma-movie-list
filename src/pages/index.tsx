import Head from "next/head";

import { List, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import Listbox from "../components/Listbox";
import { useState } from "react";
import { InputProps } from "../types";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  const fetchedList: List[] = await prisma.list.findMany({
    include: {
      movies: {
        select: {
          listId: true,
          id: true,
          title: true,
          watched: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return {
    props: {
      fetchedList,
    },
  };
};

const App = ({ fetchedList }) => {
  const { handleSubmit, control } = useForm<InputProps>();
  const [list, setList] = useState(fetchedList);
  const [showModal, setShowModal] = useState<any>([]);

  const onSubmit = async (values: InputProps, listId: string) => {
    try {
      if (listId) {
        values.listId = listId;
      }
      const res = await fetch("/api/movies", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        res.json().then((data) => {
          let newList = [...data.movies];
          setList(newList);
          console.log(newList);
          console.log(list);
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-200">
      <Head>
        <title>Lista de Filmes</title>
        <meta name="description" content="Generated" />
      </Head>
      <header className="flex flex-row justify-center w-full">
        <h1 className="text-5xl text-red-600 my-8">Lista de Filmes</h1>
      </header>
      <main className="container mx-auto">
        <div className="grid grid-cols-4 gap-8">
          {fetchedList.map((list, idx) => (
            <Listbox
              key={list.id}
              list={list}
              listIndex={idx}
              control={control}
              showModal={showModal}
              setShowModal={setShowModal}
              onSubmit={handleSubmit((values: any) =>
                onSubmit(values, list.id)
              )}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;

import Head from "next/head";

import { List, PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Listbox from "../components/Listbox";
import { useState } from "react";
import { InputProps } from "../types";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  const fetchedList: List[] = await prisma.list.findMany({
    include: {
      movies: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  console.log(fetchedList[0].movies);

  return {
    props: {
      fetchedList,
    },
  };
};

const App = ({ fetchedList }) => {
  const { handleSubmit, control } = useForm<InputProps>();
  const [list, setList] = useState(fetchedList);

  const onSubmit = async (values: InputProps) => {
    try {
      const res = await fetch("/api/movies", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setList([...list, values]);
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-200">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated" />
      </Head>
      <header className="flex flex-row justify-center w-full">
        <h1 className="text-5xl text-red-600 my-8">Lista de Filmes</h1>
      </header>
      <main className="container mx-auto">
        <div className="grid grid-cols-4 gap-8">
          {fetchedList.map((list) => (
            <Listbox key={list.id} list={list} />
          ))}
        </div>
        {/* <Input name="title" control={control} />
        <Input name="genre" control={control} />
        <button onClick={handleSubmit(onSubmit)}>Submit</button> */}
      </main>
    </div>
  );
};

export default App;

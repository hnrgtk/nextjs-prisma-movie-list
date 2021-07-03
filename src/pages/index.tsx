import Head from "next/head";

import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import Listbox from "../components/Listbox";
import { useState } from "react";
import { InputProps, ListModel } from "../types";
import { useRouter } from "next/dist/client/router";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  const fetchedList: ListModel[] = await prisma.list.findMany({
    include: {
      movies: {
        select: {
          listId: true,
          id: true,
          title: true,
          watched: true,
        },
        orderBy: {
          watched: "asc",
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
  const { asPath, replace } = useRouter();
  const { handleSubmit, control } = useForm<InputProps>();
  const [showModal, setShowModal] = useState<any>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<any>([]);

  const onSubmit = async (
    values: InputProps,
    listId: string,
    index: number
  ) => {
    try {
      if (listId) {
        values.listId = listId;
      }
      const res = await fetch("/api/movies", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        replace(asPath);
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setShowModal((prevState) => {
        prevState[index] = false;
        return [...prevState];
      });
    }
  };

  const deleteList = async (listId: string, index: number) => {
    try {
      const res = await fetch("/api/delete-list", {
        method: "DELETE",
        body: JSON.stringify({ listId }),
      });
      if (res.ok) {
        replace(asPath);
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setShowDeleteModal((prevState) => {
        prevState[index] = false;
        return [...prevState];
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Head>
        <title>Lista de Filmes</title>
        <meta name="description" content="Generated" />
      </Head>
      <header className="flex flex-row justify-center w-full">
        <button className="bg-green-500 text-white active:bg-green-800 text-2xl px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none my-6 ease-linear transition-all duration-150">
          <p>Criar Nova Lista</p>
        </button>
      </header>
      <main className="container mx-auto">
        <div className="grid grid-cols-4 gap-8">
          {fetchedList &&
            fetchedList.map((list, idx) => (
              <Listbox
                key={list.id}
                list={list}
                listIndex={idx}
                control={control}
                showModal={showModal}
                setShowModal={setShowModal}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                onSubmit={handleSubmit((values: any) =>
                  onSubmit(values, list.id, idx)
                )}
                deleteList={() => deleteList(list.id, idx)}
              />
            ))}
        </div>
      </main>
    </div>
  );
};

export default App;

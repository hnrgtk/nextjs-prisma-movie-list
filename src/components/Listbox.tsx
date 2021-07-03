import Card from "./Card";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import Input from "./Input";
import { Control } from "react-hook-form";
import { InputProps, ListModel } from "../types";

type ListboxProps = {
  list: ListModel;
  control: Control<InputProps>;
  onSubmit: (value: any) => void;
  showModal: any;
  setShowModal: (values: any) => void;
  showDeleteModal: any;
  setShowDeleteModal: (values: any) => void;
  listIndex: number;
  deleteList: (value: any) => void;
};

const Listbox = ({
  list: { name, movies, id },
  control,
  onSubmit,
  showModal,
  setShowModal,
  showDeleteModal,
  setShowDeleteModal,
  listIndex,
  deleteList,
}: ListboxProps) => (
  <>
    <Modal
      setShowModal={setShowModal}
      showModal={Boolean(showModal?.[listIndex]) ?? false}
      control={control}
      onSubmit={onSubmit}
      listIndex={listIndex}
      title="Ficha do Filme"
      body={
        <div className="relative p-6 flex-auto">
          <Input name="title" label="Nome do filme" control={control} />
          <Input name="genre" label="Gênero" control={control} />
        </div>
      }
    />
    <Modal
      setShowModal={setShowDeleteModal}
      showModal={Boolean(showDeleteModal?.[listIndex]) ?? false}
      control={control}
      onSubmit={deleteList}
      listIndex={listIndex}
      title="Excluir lista"
      body={
        <div className="relative p-6 flex-auto">
          <h4>Deseja mesmo excluir a lista?</h4>
        </div>
      }
    />
    <div className="flex flex-col bg-white w-full rounded-xl shadow-md p-3">
      <div className="mb-2">
        <p className="text-2xl">{name}</p>
      </div>
      <div className="h-full">
        {movies && movies.length > 0 ? (
          movies.map((m) => (
            <div key={m.id} className="my-2">
              <Card movie={m} listId={id} />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Clique no + para adicionar filmes!</p>
          </div>
        )}
      </div>
      <div className="flex justify-end w-full">
        <div>
          <button
            className="bg-green-500 text-white active:bg-green-800 text-1xl px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={() => {
              setShowModal((prevState: any) => {
                prevState[listIndex] = true;
                return [...prevState];
              });
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div>
          <button
            className="bg-red-500 text-white active:green-800 text-1xl px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={() => {
              setShowDeleteModal((prevState: any) => {
                prevState[listIndex] = true;
                return [...prevState];
              });
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  </>
);
export default Listbox;

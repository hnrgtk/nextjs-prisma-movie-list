import { List, Movie } from "@prisma/client";
import Card from "./Card";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ListboxProps = {
  list: List;
};

const Listbox = ({ list: { name, movies } }: ListboxProps) => {
  return (
    <div className="flex flex-col bg-white w-full rounded-xl shadow-md p-3">
      <div className="mb-2">
        <p>{name}</p>
      </div>
      <div className="h-full">
        {movies.length > 0 ? (
          movies.map((m) => (
            <div key={m.id} className="my-2">
              <Card movie={m} />
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
            type="button"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div>
          <button
            className="bg-red-500 text-white active:green-800 text-1xl px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Listbox;

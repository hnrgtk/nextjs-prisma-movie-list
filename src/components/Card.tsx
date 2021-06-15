import { Movie } from "@prisma/client";
import { faMinus, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type CardProps = {
  movie: Movie;
};

const Card = ({ movie: { title, watched } }: CardProps) => {
  return (
    <div
      className={`flex justify-between w-full bg-gray-300 p-2 h-12 rounded-md ${
        watched ? "line-through" : "no-underline"
      }`}
    >
      <p>{title}</p>
      {!watched && (
        <button className="active:bg-green-800 text-2xl rounded shadow opacity-40 hover:opacity-100 hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
          <FontAwesomeIcon icon={faCheckCircle} color="#10B981" />
        </button>
      )}
    </div>
  );
};

export default Card;

import { Movie } from "@prisma/client";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/dist/client/router";
type CardProps = {
  movie: Movie;
  listId: string;
};

const Card = ({ movie: { title, watched, id }, listId }: CardProps) => {
  const { replace, asPath } = useRouter();
  const handleWatched = async () => {
    const data = {
      watched: true,
      movieId: id,
      listId,
    };
    try {
      const res = await fetch("/api/watched", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        replace(asPath);
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  return (
    <div
      className={`flex justify-between w-full bg-gray-300 p-2 h-12 rounded-md ${
        watched ? "line-through" : "no-underline"
      }`}
    >
      <p>{title}</p>
      {!watched && (
        <button
          onClick={handleWatched}
          className="text-2xl rounded shadow 
          hover:opacity-100 
          hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear 
          transition-all duration-150"
        >
          <FontAwesomeIcon icon={faCheckCircle} color="#10B981" />
        </button>
      )}
    </div>
  );
};

export default Card;

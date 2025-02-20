import { Link } from "react-router-dom";
import { apiUrl } from "../../globalConstants.ts";

interface Props {
  name: string;
  id: string;
  image: string;
  isPublished?: boolean;
}

const CocktailItem: React.FC<Props> = ({ name, id, image, isPublished }) => {
  return (
    <div className="card " style={{ width: "250px", minHeight: "200px" }}>
      <div
        className="w-100 h-75 d-flex align-items-center rounded-2  "
        style={{ width: "250px", minHeight: "150px", overflow: "hidden" }}
      >
        <img
          className="card-img-top mx-auto rounded-2"
          style={{ width: "auto", height: "150px" }}
          src={`${apiUrl}/${image}`}
          alt={name}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title text-center fs-4 mt-3">{name}</h5>
        <Link to={`/cocktails/${id}`} className="d-block mt-auto text-decoration-underline text-center form-link-nav">
          Learn more
        </Link>
      </div>
      {/*{!isPublished ? <p className={'text-secondary'}> Published </p>: <p>Unpublished</p>}*/}
    </div>
  );
};

export default CocktailItem;

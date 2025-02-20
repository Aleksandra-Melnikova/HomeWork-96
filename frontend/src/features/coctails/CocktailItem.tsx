import { Link } from "react-router-dom";
import { apiUrl } from "../../globalConstants.ts";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../users/UserSlice.ts";
import ButtonLoading from "../../components/UI/UI/ButtonLoading/ButtonLoading.tsx";
import {
  selectDeleteLoading,
  selectPublishedLoading,
} from "./coctailsSlice.ts";

interface Props {
  name: string;
  id: string;
  image: string;
  isPublished?: boolean;
  userID?: string | boolean;
  onDelete?: (id: string) => void;
  onPublished?: (id: string) => void;
}

const CocktailItem: React.FC<Props> = ({
  name,
  id,
  image,
  isPublished,
  userID,
  onDelete,
  onPublished,
}) => {
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const publishedLoading = useAppSelector(selectPublishedLoading);
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
        <Link
          to={`/cocktails/${id}`}
          className="d-block mt-auto text-decoration-underline text-center form-link-nav"
        >
          Learn more
        </Link>
        {user?.role === "admin" && onDelete && onPublished ? (
          <div className={"row"}>
            <div className={"col-6 mt-4"}>
              <ButtonLoading
                isLoading={deleteLoading}
                isDisabled={deleteLoading}
                text={"Delete"}
                type={"button"}
                onClick={() => onDelete(id)}
              />
            </div>
            {isPublished ? (
              <p
                className={
                  "d-block col-6 text-center fs-6 text-secondary mt-auto mb-0 pb-1"
                }
              >
                published
              </p>
            ) : (
              <div className={"col-6 mt-4"}>
                <ButtonLoading
                  isLoading={publishedLoading}
                  isDisabled={publishedLoading}
                  onClick={() => onPublished(id)}
                  text={"Publish"}
                  type={"button"}
                />
              </div>
            )}
          </div>
        ) : (
          <>
            {userID ? (
              <>
                {isPublished ? (
                  <p className={"text-secondary text-center"}>Published</p>
                ) : (
                  <p className={"text-center text-secondary"}>Unpublished</p>
                )}
              </>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default CocktailItem;

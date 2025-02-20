import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import CocktailItem from "./CocktailItem.tsx";
import { selectFetchLoading, selectProductsItems } from "./coctailsSlice.ts";
import {
  deleteCocktail,
  fetchCocktails,
  fetchCocktailsForOneUser,
  publishCocktail,
} from "./coctailsThunk.ts";
import Loader from "../../components/UI/UI/Loader/Loader.tsx";
import { selectUser } from "../users/UserSlice.ts";

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectProductsItems);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("userID");
  const user = useAppSelector(selectUser);

  const fetchAllCocktails = useCallback(() => {
    if (userId) {
      dispatch(fetchCocktailsForOneUser(userId));
    } else {
      dispatch(fetchCocktails());
    }
  }, [userId, dispatch]);

  useEffect(() => {
    void fetchAllCocktails();
  }, [fetchAllCocktails]);

  const deleteOneCocktail = async (id: string) => {
    await dispatch(deleteCocktail(id));
    void fetchAllCocktails();
  };

  const publishOneCocktail = async (id: string) => {
    await dispatch(publishCocktail(id));
    void fetchAllCocktails();
  };

  return (
    <div className="container row justify-content-center mt-0 pt-0 px-0">
      <div className="col-12 mx-auto text-center">
        <>
          {isFetchLoading ? (
            <Loader />
          ) : (
            <div className="d-flex flex-row gap-5 flex-wrap align-items-center mt-2">
              <>
                {cocktails.length > 0 ? (
                  user?.role === "admin" ? (
                    <>
                      {cocktails.map((c) => (
                        <CocktailItem
                          onDelete={deleteOneCocktail}
                          onPublished={publishOneCocktail}
                          key={c._id}
                          name={c.name}
                          image={c.image}
                          id={c._id}
                          isPublished={c.isPublished}
                          userID={true}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {userId ? (
                        <>
                          {" "}
                          {cocktails.map((c) => (
                            <CocktailItem
                              key={c._id}
                              name={c.name}
                              image={c.image}
                              id={c._id}
                              isPublished={c.isPublished}
                              userID={true}
                            />
                          ))}
                        </>
                      ) : (
                        <>
                          {cocktails.map((c) =>
                            c.isPublished ? (
                              <CocktailItem
                                key={c._id}
                                name={c.name}
                                image={c.image}
                                id={c._id}
                                userID={false}
                              />
                            ) : null,
                          )}{" "}
                        </>
                      )}
                    </>
                  )
                ) : (
                  <p> No cocktails</p>
                )}
              </>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Cocktails;

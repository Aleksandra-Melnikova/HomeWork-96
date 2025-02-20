import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import CocktailItem from "./CocktailItem.tsx";
import { selectFetchLoading, selectProductsItems } from "./coctailsSlice.ts";
import { fetchCocktails, fetchCocktailsForOneUser } from './coctailsThunk.ts';
import Loader from '../../components/UI/UI/Loader/Loader.tsx';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectProductsItems);
  const isFetchLoading = useAppSelector(selectFetchLoading);
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('userID');

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

  // const fetchProductsOnId = async (id: string) => {
  //   await dispatch(fetchProductsOnCategory(id));
  // };


  return (
    <>
      <div className="container row justify-content-between mt-5 px-0">
        <div className="col-9">
          <>
            {isFetchLoading ? (
              <Loader />
            ) : (
              <div className="d-flex flex-row gap-5 flex-wrap align-items-center mt-5">
                <>
                  {cocktails.length > 0 ? (
                    <>
                      {cocktails.map((c) => (
                        c.isPublished ? (
                          <CocktailItem
                            key={c._id}
                            name={c.name}
                            image={c.image}
                            id={c._id}
                          />
                        ) : null
                      ))}
                    </>
                  ) : (
                    <p> No cocktails</p>
                  )}
                </>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default Cocktails;

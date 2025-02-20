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



  return (
      <div className="container row justify-content-between mt-0 pt-0 px-0">
        <div className="col-9">
          <>
            {isFetchLoading ? (
              <Loader />
            ) : (
              <div className="d-flex flex-row gap-5 flex-wrap align-items-center mt-2">
                <>
                  {cocktails.length > 0 ? (
                    <>{userId?<> {cocktails.map((c) => (
                      <CocktailItem
                        key={c._id}
                        name={c.name}
                        image={c.image}
                        id={c._id}
                        isPublished={c.isPublished}
                        userID= {true}
                      />
                    ))}</>: <>{cocktails.map((c) => (
                        c.isPublished ? (
                        <CocktailItem
                        key={c._id}
                      name={c.name}
                      image={c.image}
                      id={c._id}
                        userID = {false}
                    />
                  ) : null
                    ))} </>}
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
  );
};

export default Cocktails;

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import CocktailItem from "./CocktailItem.tsx";
import { selectFetchLoading, selectProductsItems } from "./coctailsSlice.ts";
import { fetchCocktails } from './coctailsThunk.ts';
import Loader from '../../components/UI/UI/Loader/Loader.tsx';

const Cocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectProductsItems);
  const isFetchLoading = useAppSelector(selectFetchLoading);

  const fetchAllCocktails = () => {
    dispatch(fetchCocktails());
  };
  

  useEffect(() => {
    void fetchAllCocktails();
  }, [dispatch]);

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
                        <CocktailItem
                          key={c._id}
                       name={c.name}
                       image={c.image}
                         id={c._id}/>
                      ))}
                      )
                    </>
                  ) : (
                    <p> No products</p>
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

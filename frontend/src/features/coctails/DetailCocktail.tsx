import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../globalConstants.ts";
import { getCocktail} from './coctailsThunk.ts';
import {

  selectFetchOneLoading, selectOneCocktail,

} from './coctailsSlice.ts';

import Loader from '../../components/UI/UI/Loader/Loader.tsx';

const DetailCocktail = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const isLoading = useAppSelector(selectFetchOneLoading);
  const cocktail = useAppSelector(selectOneCocktail);

  // const isDeleteLoading = useAppSelector(selectDeleteLoading);
console.log(params.id)
  useEffect(() => {
    if (params.id) {
      dispatch(getCocktail(params.id));
    }
  }, [dispatch, params.id]);

  // const onDeleteProduct = async (id: string) => {
  //   try {
  //     if (user)
  //       await dispatch(deleteProduct({ productId: id, token: user?.token }));
  //     navigate("/products");
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    cocktail && (
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="container mt-5 ">
              <div className="my-5 shadow rounded">
                <div className=" shadow-sm  p-3 rounded border-0">
                  <div className="d-flex flex-column">
                    <h5 className=" fw-semibold fs-3 my-2">{cocktail.name}</h5>
                    <div className={"row d-flex mt-2"}>
                      <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12 d-flex align-items-center justify-content-center text-primary">
                        {cocktail.image ? (
                          <img
                            src={
                              cocktail.image
                                ? `${apiUrl}/${cocktail.image}`
                                : undefined
                            }
                            alt={cocktail.name}
                            className="w-100 h-auto mb-3 rounded"
                          />
                        ) : (
                          <i className="bi bi-chat-left-text-fill"></i>
                        )}
                      </div>
                      <div
                        className={
                          "col-lg-6 col-xl-6 col-md-6 col-sm-12 d-flex flex-column"
                        }
                      >
                        <p className=" flex-grow-1">
                          <strong>Receipt</strong>: {cocktail.receipt}
                        </p>
                        <h4 className="text-muted fs-5">Ingredients: </h4>
                       <ul>
                         {cocktail.ingredients.map((ingredient) => (
                           <li key={ingredient.title}>{ingredient.title} : {ingredient.quantity} ml</li>
                         ))}
                       </ul>

                        {/*{user?.username === product.user.username ? (*/}
                        {/*  // <ButtonLoading*/}
                        {/*  //   isLoading={isDeleteLoading}*/}
                        {/*  //   isDisabled={isDeleteLoading}*/}
                        {/*  //   text={"delete"}*/}
                        {/*  //   type="button"*/}
                        {/*  //   onClick={() => onDeleteProduct(product?._id)}*/}
                        {/*  // />*/}
                        {/*) : null}*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )
  );
};

export default DetailCocktail;

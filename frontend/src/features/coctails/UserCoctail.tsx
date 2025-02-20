// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
// import CocktailItem from "./CocktailItem.tsx";
// import { selectFetchLoading, selectProductsItems } from "./coctailsSlice.ts";
// import { fetchCocktailsForOneUser } from './coctailsThunk.ts';
// import Loader from '../../components/UI/UI/Loader/Loader.tsx';
// import { selectUser } from '../users/UserSlice.ts';
//
// const Cocktails = () => {
//   const dispatch = useAppDispatch();
//   const cocktails = useAppSelector(selectProductsItems);
//   const isFetchLoading = useAppSelector(selectFetchLoading);
//   const user = useAppSelector(selectUser);
//
//   const fetchAllCocktails = () => {
//     if(user)
//     dispatch(fetchCocktailsForOneUser(user._id));
//   };
//
//
//   useEffect(() => {
//     void fetchAllCocktails();
//   }, [dispatch]);
//
//
//   return (
//     <>
//       <div className="container row justify-content-between mt-5 px-0">
//         <div className="col-9">
//           <>
//             {isFetchLoading ? (
//               <Loader />
//             ) : (
//               <div className="d-flex flex-row gap-5 flex-wrap align-items-center mt-5">
//                 <>
//                   {cocktails.length > 0 ? (
//                     <>
//                       {cocktails.map((c) => (
//                       (
//                           <CocktailItem
//                             key={c._id}
//                             name={c.name}
//                             image={c.image}
//                             id={c._id}
//                             isPublished={c.isPublished}
//                           />
//                         )
//                       ))}
//                     </>
//                   ) : (
//                     <p> No cocktails</p>
//                   )}
//                 </>
//               </div>
//             )}
//           </>
//         </div>
//       </div>
//     </>
//   );
// };
//
// export default Cocktails;

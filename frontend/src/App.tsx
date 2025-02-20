
import './App.css'
import Layout from './components/UI/UI/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import Cocktails from './features/coctails/Cocktails.tsx';
import DetailCocktail from './features/coctails/DetailCocktail.tsx';
import { useAppSelector } from './app/hooks.ts';
import { selectUser } from './features/users/UserSlice.ts';
import CocktailForm from './features/coctails/CocktailForm.tsx';


const App = () => {
 const user = useAppSelector(selectUser);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Cocktails />} />
          <Route path="/cocktails" element={<Cocktails />} />
          <Route path={`/cocktails?userID=${user?._id}`} element={<Cocktails/>} />
          <Route path="/add_cocktail" element={<CocktailForm />} />
          <Route path="/cocktails/:id" element={<DetailCocktail/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={<h1 className={"text-center mt-5"}>Not found</h1>}
          />
        </Routes>
      </Layout>
    </>
  )
};

export default App

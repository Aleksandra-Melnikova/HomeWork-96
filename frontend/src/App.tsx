
import './App.css'
import Layout from './components/UI/UI/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import Cocktails from './features/coctails/Cocktails.tsx';


const App = () => {


  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Cocktails />} />
          {/*<Route path="/coctails" element={<Cocktails />} />*/}
          {/*<Route path="/add_products" element={<ProductForm />} />*/}
          {/*<Route path="/coctails/:productsId" element={<DetailCocktail />} />*/}
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

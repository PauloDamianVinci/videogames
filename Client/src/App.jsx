// Componentes:
import About from "./components/About/About";
import Cards from "./components/Cards/Cards";
import Error from "./components/Error/Error";
import Landing from "./components/Landing/landing";
import Nav from "./components/Nav/Nav";
// hooks, routers, reducers:
// import { useState } from "react";
//import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addFav, saveIdUser } from "./redux/actions";
// .env:
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/videogames';
const ROOT = import.meta.env.VITE_ROOT || '/';

// const LOGIN_URL = import.meta.env.VITE_VG_LOGIN || '/login';
// const VG_LOGIN = API_URL_BASE + LOGIN_URL;
// const CHARS_URL = import.meta.env.VITE_VG_CHARS || '/character';
// const VG_CHARS = API_URL_BASE + CHARS_URL;
// const HOME = import.meta.env.VITE_HOME || '/home';
// const ABOUT = import.meta.env.VITE_ABOUT || '/about';
// const LOGIN = import.meta.env.VITE_LOGIN || '/';
// const DETAIL = import.meta.env.VITE_DETAIL || '/detail/:id';
// const FAVORITES = import.meta.env.VITE_FAVORITES || '/favorites';
// Otros:
// import ProtectedRoute from "./functions/ProtectedRoute";

const App = () => {
  // const [characters, setCharacters] = useState([]);
  // const [access, setAccess] = useState(false);
  // const location = useLocation();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  // const [hide, setHide] = useState(false);

  return (
    <div>
      {location.pathname !== ROOT && < Nav hide={hide} onSearch={onSearch} logout={logout} />}
      <Routes>
        <Route path={LOGIN} element={<Form login={login} />} />
        <Route element={<ProtectedRoute Access={access} />}>
          <Route path={HOME} element={<Cards characters={characters} onClose={onClose} />} />
          <Route path={ABOUT} element={<About />} />
          <Route path={DETAIL} element={<Detail />} />
          <Route path={FAVORITES} element={<Favorites />} />
        </Route>
        {/* envío setHide para ocultar la barra de navegación al mostrar error en página: */}
        <Route path="*" element={<ErrorView logout={logout} setHide={setHide} />} />
      </Routes>
    </div>
  );
}
export default App;

// import About from "./components/About/About";
// import Cards from "./components/Cards/Cards";
// import Error from "./components/Error/Error";
// import Landing from "./components/Landing/landing";
// import Nav from "./components/Nav/Nav";
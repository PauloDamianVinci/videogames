// Vistas:
import Landing from "./views/Landing/Landing.jsx";
import Home from "./views/Home/Home.jsx";
import Create from "./views/Create/Create.jsx";
import Edit from "./views/Edit/Edit.jsx";
import Detail from "./views/Detail/Detail.jsx";
import About from "./views/About/About.jsx";
import Error from "./views/Error/Error.jsx";
// hooks, routers, reducers:
import { Route, Routes } from "react-router-dom";
// Variables de entorno:
const ROOT = import.meta.env.VITE_ROOT || '/';
const HOME = import.meta.env.VITE_HOME || '/home';
const CREATE = import.meta.env.VITE_CREATE || '/create';
const DETAIL = import.meta.env.VITE_DETAIL || '/detail/:id';
const EDIT = import.meta.env.VITE_EDIT || '/edit/:id';
const ABOUT = import.meta.env.VITE_ABOUT || '/about';
const ERROR = import.meta.env.VITE_ERROR || '/error';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={ROOT} element={<Landing />} />
        <Route path={HOME} element={<Home />} />
        <Route path={CREATE} element={<Create />} />
        <Route path={DETAIL} element={<Detail />} />
        <Route path={EDIT} element={<Edit />} />
        <Route path={ABOUT} element={<About />} />
        <Route path={ERROR} element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
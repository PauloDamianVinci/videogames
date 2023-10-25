// Vistas:
import Landing from "./views/Landing/landing";
import Home from "./views/Home/Home";
import Create from "./views/Create/Create";
import Detail from "./views/Detail/Detail";
import About from "./views/About/About";
import Error from "./views/Error/Error";
// hooks, routers, reducers:
import { Route, Routes } from "react-router-dom";
// Variables de entorno:
const ROOT = import.meta.env.VITE_ROOT || '/';
const HOME = import.meta.env.VITE_HOME || '/home';
const CREATE = import.meta.env.VITE_CREATE || '/create';
const DETAIL = import.meta.env.VITE_DETAIL || '/detail/:id';
const ABOUT = import.meta.env.VITE_ABOUT || '/about';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={ROOT} element={<Landing />} />
        <Route path={HOME} element={<Home />} />
        <Route path={CREATE} element={<Create />} />
        <Route path={DETAIL} element={<Detail />} />
        <Route path={ABOUT} element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
export default App;

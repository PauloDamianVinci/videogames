// ! Componente de búsqueda. Funciona a medida que se va tipeando.
// hooks, routers, reducers:
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearFilterByName, filterVideogamesByName } from "../../redux/actions";
// Estilos:
import style from "./Search.module.css";
const { input, container, containerSec } = style;

const Search = (props) => {
    const { aux, setAux } = props;
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    let curName = useSelector((state) => state?.filters.name);

    useEffect(() => {
        setName(curName);
    }, [aux]);

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        if (!e.target.value) { // 
            dispatch(clearFilterByName());
        } else { // 
            dispatch(filterVideogamesByName(e.target.value));
            setAux(!aux);
        }
    }

    return (
        <div className={container}>
            <div className={containerSec}>
                <input
                    className={input}
                    name="name"
                    type="text"
                    placeholder="Search by name..."
                    value={name}
                    onChange={handleInputChange}
                    id="name"
                />
            </div>
        </div >
    )
}

export default Search;
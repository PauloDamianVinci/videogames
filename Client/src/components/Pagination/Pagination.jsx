// hooks, routers, reducers:
// import { useState, useEffect } from "react";
// Estilos:
import style from "./Pagination.module.css";
const { paginados, activePage } = style;

const Pagination = (props) => {
    const { videogamePerPage, allVideogames, paginado, currentPage } = props;
    const pgNum = []
    //const [isLoading, setIsLoading] = useState(true);


    // useEffect(() => {
    //     setIsLoading(false);
    // }, []);



    for (let i = 0; i < Math.ceil(allVideogames / videogamePerPage); i++) {
        pgNum.push(i + 1)
    }

    return (
        <div>
            <nav className={paginados}>
                <ul>
                    {pgNum.map((number) => {
                        return (
                            <li key={number}>
                                <a href={`#${number}`}
                                    className={number === currentPage ? activePage : ""}
                                    onMouseDown={() => paginado(number)}>
                                    {number}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

        </div>
    );


}

export default Pagination;

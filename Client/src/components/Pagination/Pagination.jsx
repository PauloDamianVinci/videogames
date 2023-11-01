// Estilos:
import style from "./Pagination.module.css";
const { paginados, activePage, container, contButton, button } = style;

const Pagination = (props) => {
    const { videogamePerPage, allVideogames, paginado, currentPage } = props;
    const pgNum = []

    for (let i = 0; i < Math.ceil(allVideogames / videogamePerPage); i++) {
        pgNum.push(i + 1)
    }

    return (
        <div>
            <ul className={container}>
                {pgNum.map((number) => {
                    return (
                        <li key={number}>
                            <div className={contButton}>
                                <button
                                    onClick={() => paginado(number)}
                                    className={number === currentPage ? button : ""}
                                >
                                    {number}
                                </button>
                            </div>

                        </li>
                    );
                })}
            </ul>
        </div>
    );


}

export default Pagination;
// return (
//     <div>
//         <nav className={paginados}>
//             <ul>
//                 {pgNum.map((number) => {
//                     return (
//                         <li key={number}>
//                             <a href={`#${number}`}
//                                 className={number === currentPage ? activePage : ""}
//                                 onMouseDown={() => paginado(number)}>
//                                 {number}
//                             </a>
//                         </li>
//                     );
//                 })}
//             </ul>
//         </nav>

//     </div>
// );
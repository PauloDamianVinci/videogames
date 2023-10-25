import style from "./Pagination.module.css";
const { paginados, activePage } = style;

const Pagination = (props) => {
    const { videogamePerPage, allVideogames, paginado, currentPage } = props;
    const pgNum = []

    for (let i = 0; i < Math.ceil(allVideogames / videogamePerPage); i++) {
        pgNum.push(i + 1)
    }
    //console.log(pgNum);
    return (
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
    );
}

export default Pagination;
